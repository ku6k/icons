#!/usr/bin/env node

/**
 * KU6K Brandbook Version Check Script
 * Validates version consistency and dependencies across modules
 */

const fs = require("node:fs");
const path = require("node:path");
const semver = require("semver");

const MODULES_DIR = path.join(__dirname, "../modules");
const BRANDBOOK_PKG = path.join(__dirname, "../package.json");

class VersionChecker {
  constructor() {
    this.modules = [];
    this.issues = [];
    this.brandbook = this.loadPackageJson(BRANDBOOK_PKG);
  }

  loadPackageJson(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      this.issues.push(`❌ Failed to load ${filePath}: ${error.message}`);
      return null;
    }
  }

  discoverModules() {
    try {
      const moduleNames = fs
        .readdirSync(MODULES_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      for (const moduleName of moduleNames) {
        const pkgPath = path.join(MODULES_DIR, moduleName, "package.json");
        const pkg = this.loadPackageJson(pkgPath);

        if (pkg) {
          this.modules.push({
            name: moduleName,
            packageName: pkg.name,
            version: pkg.version,
            path: pkgPath,
            pkg,
          });
        }
      }

      console.log(`🔍 Discovered ${this.modules.length} modules`);
    } catch (error) {
      this.issues.push(`❌ Failed to discover modules: ${error.message}`);
    }
  }

  validateVersionFormats() {
    console.log("\n📋 Validating version formats...");

    // Check brandbook version
    if (this.brandbook && !semver.valid(this.brandbook.version)) {
      this.issues.push(
        `❌ Invalid brandbook version: ${this.brandbook.version}`,
      );
    }

    // Check module versions
    for (const module of this.modules) {
      if (!semver.valid(module.version)) {
        this.issues.push(
          `❌ Invalid version in ${module.name}: ${module.version}`,
        );
      } else {
        console.log(`  ✅ ${module.packageName}@${module.version}`);
      }
    }
  }

  validateNamingConventions() {
    console.log("\n🏷️  Validating naming conventions...");

    const expectedPrefix = "@ku6k/";

    for (const module of this.modules) {
      if (!module.packageName.startsWith(expectedPrefix)) {
        this.issues.push(
          `❌ Invalid package name: ${module.packageName} (should start with ${expectedPrefix})`,
        );
      } else {
        console.log(`  ✅ ${module.packageName} follows naming convention`);
      }
    }
  }

  validateDependencies() {
    console.log("\n🔗 Validating dependencies...");

    // Check for circular dependencies and version consistency
    const dependencyGraph = new Map();

    for (const module of this.modules) {
      const deps = {
        ...module.pkg.dependencies,
        ...module.pkg.peerDependencies,
        ...module.pkg.devDependencies,
      };

      const moduleDeps = [];
      for (const [depName, depVersion] of Object.entries(deps)) {
        if (depName.startsWith("@ku6k/")) {
          const depModule = this.modules.find((m) => m.packageName === depName);
          if (depModule) {
            const isVersionCompatible = semver.satisfies(
              depModule.version,
              depVersion,
            );
            if (!isVersionCompatible) {
              this.issues.push(
                `❌ Version mismatch: ${module.name} requires ${depName}@${depVersion} but found ${depModule.version}`,
              );
            }
            moduleDeps.push(depName);
          }
        }
      }

      dependencyGraph.set(module.packageName, moduleDeps);
    }

    // Check for circular dependencies
    this.detectCircularDependencies(dependencyGraph);

    if (this.issues.length === 0) {
      console.log("  ✅ All dependencies are valid");
    }
  }

  detectCircularDependencies(graph, visited = new Set(), path = []) {
    for (const [node, deps] of graph) {
      if (visited.has(node)) continue;

      if (this.hasCircularDep(graph, node, new Set(), [])) {
        this.issues.push(`❌ Circular dependency detected involving: ${node}`);
      }
    }
  }

  hasCircularDep(graph, node, visited, path) {
    if (path.includes(node)) {
      return true;
    }

    if (visited.has(node)) {
      return false;
    }

    visited.add(node);
    path.push(node);

    const deps = graph.get(node) || [];
    for (const dep of deps) {
      if (this.hasCircularDep(graph, dep, visited, [...path])) {
        return true;
      }
    }

    return false;
  }

  validateChangelogs() {
    console.log("\n📝 Validating changelogs...");

    for (const module of this.modules) {
      const changelogPath = path.join(
        path.dirname(module.path),
        "CHANGELOG.md",
      );

      if (!fs.existsSync(changelogPath)) {
        this.issues.push(`❌ Missing CHANGELOG.md for ${module.name}`);
        continue;
      }

      const changelog = fs.readFileSync(changelogPath, "utf8");

      // Check if current version is documented
      const versionPattern = new RegExp(
        `## \\[${module.version.replace(/\./g, "\\.")}\\]`,
      );
      if (!versionPattern.test(changelog)) {
        this.issues.push(
          `❌ Version ${module.version} not documented in ${module.name} changelog`,
        );
      } else {
        console.log(`  ✅ ${module.name} changelog is up to date`);
      }
    }
  }

  generateVersionMatrix() {
    console.log("\n📊 Version Matrix:");
    console.log("┌─────────────────────────┬───────────┐");
    console.log("│ Module                  │ Version   │");
    console.log("├─────────────────────────┼───────────┤");

    // Brandbook version
    console.log(
      `│ ku6k-brandbook          │ ${this.brandbook.version.padEnd(9)} │`,
    );
    console.log("├─────────────────────────┼───────────┤");

    // Module versions
    const sortedModules = this.modules.sort((a, b) =>
      a.packageName.localeCompare(b.packageName),
    );

    for (const module of sortedModules) {
      const name = module.packageName.replace("@ku6k/", "").padEnd(23);
      const version = module.version.padEnd(9);
      console.log(`│ ${name} │ ${version} │`);
    }

    console.log("└─────────────────────────┴───────────┘");
  }

  checkVersionConsistency() {
    console.log("\n🔄 Checking version consistency...");

    // Special case: dark mode should be version 2.x while light mode is 1.x
    const colorTokens = this.modules.find((m) => m.name === "color-tokens");
    const colorTokensDark = this.modules.find(
      (m) => m.name === "color-tokens-dark",
    );

    if (colorTokens && colorTokensDark) {
      const lightMajor = semver.major(colorTokens.version);
      const darkMajor = semver.major(colorTokensDark.version);

      if (lightMajor === 1 && darkMajor === 2) {
        console.log(
          "  ✅ Dark mode versioning strategy is correct (v2.x for future implementation)",
        );
      } else {
        this.issues.push(
          `❌ Dark mode version strategy incorrect: light@${colorTokens.version}, dark@${colorTokensDark.version}`,
        );
      }
    }
  }

  run() {
    console.log("🚀 KU6K Brandbook Version Check\n");

    this.discoverModules();
    this.validateVersionFormats();
    this.validateNamingConventions();
    this.validateDependencies();
    this.validateChangelogs();
    this.checkVersionConsistency();
    this.generateVersionMatrix();

    console.log("\n📋 Summary:");
    if (this.issues.length === 0) {
      console.log("✅ All version checks passed!");
      process.exit(0);
    } else {
      console.log(`❌ Found ${this.issues.length} issue(s):`);
      for (const issue of this.issues) {
        console.log(`  ${issue}`);
      }
      process.exit(1);
    }
  }
}

// Run the version checker
if (require.main === module) {
  const checker = new VersionChecker();
  checker.run();
}

module.exports = VersionChecker;
