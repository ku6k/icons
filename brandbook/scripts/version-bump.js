#!/usr/bin/env node

/**
 * KU6K Brandbook Version Bump Script
 * Handles semantic versioning for individual modules and global brandbook
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const semver = require("semver");

const MODULES_DIR = path.join(__dirname, "../modules");
const BRANDBOOK_PKG = path.join(__dirname, "../package.json");

class VersionBumper {
  constructor() {
    this.dryRun = process.argv.includes("--dry-run");
    this.verbose = process.argv.includes("--verbose");
  }

  log(message, level = "info") {
    const prefix = {
      info: "📝",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    }[level];

    console.log(`${prefix} ${message}`);
  }

  loadPackageJson(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      this.log(`Failed to load ${filePath}: ${error.message}`, "error");
      return null;
    }
  }

  writePackageJson(filePath, pkg) {
    if (this.dryRun) {
      this.log(`[DRY RUN] Would write ${filePath}`, "info");
      return;
    }

    try {
      fs.writeFileSync(filePath, `${JSON.stringify(pkg, null, 2)}\n`);
      this.log(
        `Updated ${path.basename(path.dirname(filePath))} package.json`,
        "success",
      );
    } catch (error) {
      this.log(`Failed to write ${filePath}: ${error.message}`, "error");
    }
  }

  updateChangelog(modulePath, moduleName, oldVersion, newVersion) {
    const changelogPath = path.join(modulePath, "CHANGELOG.md");
    const date = new Date().toISOString().split("T")[0];

    let changelog = "";
    if (fs.existsSync(changelogPath)) {
      changelog = fs.readFileSync(changelogPath, "utf8");
    } else {
      changelog = `# Changelog - ${moduleName}\n\nAll notable changes to this module will be documented in this file.\n\n`;
    }

    // Insert new version entry after the header
    const versionEntry = `## [${newVersion}] - ${date}\n\n### Changed\n- Updated from version ${oldVersion}\n\n`;
    const lines = changelog.split("\n");

    // Find the insertion point (after the initial header and description)
    let insertIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("## [") || lines[i].startsWith("# ")) {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex === 0) {
      // No existing versions, add after description
      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].trim() === "" &&
          lines[i + 1] &&
          lines[i + 1].trim() !== ""
        ) {
          insertIndex = i + 1;
          break;
        }
      }
    }

    lines.splice(insertIndex, 0, versionEntry);
    const updatedChangelog = lines.join("\n");

    if (this.dryRun) {
      this.log(`[DRY RUN] Would update ${moduleName} changelog`, "info");
      return;
    }

    fs.writeFileSync(changelogPath, updatedChangelog);
    this.log(`Updated ${moduleName} changelog`, "success");
  }

  createGitTag(tag) {
    if (this.dryRun) {
      this.log(`[DRY RUN] Would create git tag: ${tag}`, "info");
      return;
    }

    try {
      execSync(`git tag ${tag}`, { stdio: this.verbose ? "inherit" : "pipe" });
      this.log(`Created git tag: ${tag}`, "success");
    } catch (error) {
      this.log(`Failed to create git tag ${tag}: ${error.message}`, "error");
    }
  }

  commitChanges(message) {
    if (this.dryRun) {
      this.log(`[DRY RUN] Would commit: ${message}`, "info");
      return;
    }

    try {
      execSync("git add .", { stdio: this.verbose ? "inherit" : "pipe" });
      execSync(`git commit -m "${message}"`, {
        stdio: this.verbose ? "inherit" : "pipe",
      });
      this.log(`Committed: ${message}`, "success");
    } catch (error) {
      this.log(`Failed to commit changes: ${error.message}`, "warning");
    }
  }

  bumpModuleVersion(moduleName, releaseType) {
    const modulePath = path.join(MODULES_DIR, moduleName);
    const pkgPath = path.join(modulePath, "package.json");

    if (!fs.existsSync(pkgPath)) {
      this.log(`Module ${moduleName} not found`, "error");
      return null;
    }

    const pkg = this.loadPackageJson(pkgPath);
    if (!pkg) return null;

    const oldVersion = pkg.version;
    const newVersion = semver.inc(oldVersion, releaseType);

    this.log(`Bumping ${pkg.name} from ${oldVersion} to ${newVersion}`, "info");

    // Update package.json
    pkg.version = newVersion;
    this.writePackageJson(pkgPath, pkg);

    // Update changelog
    this.updateChangelog(modulePath, moduleName, oldVersion, newVersion);

    // Create git tag
    this.createGitTag(`${moduleName}-v${newVersion}`);

    return {
      moduleName,
      packageName: pkg.name,
      oldVersion,
      newVersion,
      releaseType,
    };
  }

  assessGlobalImpact(changes) {
    const majorChanges = changes.filter(
      (c) => c.releaseType === "major",
    ).length;
    const minorChanges = changes.filter(
      (c) => c.releaseType === "minor",
    ).length;
    const patchChanges = changes.filter(
      (c) => c.releaseType === "patch",
    ).length;

    this.log("\n🔍 Global Impact Assessment:", "info");
    this.log(`  Major changes: ${majorChanges}`, "info");
    this.log(`  Minor changes: ${minorChanges}`, "info");
    this.log(`  Patch changes: ${patchChanges}`, "info");

    // Global version impact rules
    if (majorChanges > 0 || changes.length > 2) {
      return "minor"; // Multiple or breaking changes warrant minor bump
    }
    if (minorChanges > 0) {
      return "patch"; // Minor changes warrant patch bump
    }
    if (patchChanges > 0) {
      return null; // Patch changes don't affect global version
    }

    return null;
  }

  bumpGlobalVersion(releaseType) {
    if (!releaseType) {
      this.log("No global version bump needed", "info");
      return null;
    }

    const pkg = this.loadPackageJson(BRANDBOOK_PKG);
    if (!pkg) return null;

    const oldVersion = pkg.version;
    const newVersion = semver.inc(oldVersion, releaseType);

    this.log(
      `Bumping global brandbook from ${oldVersion} to ${newVersion}`,
      "info",
    );

    pkg.version = newVersion;
    this.writePackageJson(BRANDBOOK_PKG, pkg);

    this.createGitTag(`brandbook-v${newVersion}`);

    return {
      oldVersion,
      newVersion,
      releaseType,
    };
  }

  showUsage() {
    console.log(`
🚀 KU6K Brandbook Version Bumper

Usage:
  node version-bump.js <module> <release-type> [options]
  node version-bump.js --global <release-type> [options]

Arguments:
  <module>       Module name (color-tokens, typography, etc.)
  <release-type> patch | minor | major | prepatch | preminor | premajor
  --global       Bump only the global brandbook version

Options:
  --dry-run      Show what would be done without making changes
  --verbose      Show detailed output
  --help         Show this help message

Examples:
  node version-bump.js color-tokens patch
  node version-bump.js typography minor --dry-run
  node version-bump.js --global minor
  node version-bump.js iconography major --verbose

Module Names:
  - color-tokens
  - color-tokens-dark
  - typography
  - iconography
  - logos-wordmarks
  - brand-voice
  - design-guidelines
`);
  }

  run() {
    const args = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

    if (process.argv.includes("--help") || args.length === 0) {
      this.showUsage();
      return;
    }

    this.log("🚀 KU6K Brandbook Version Bumper\n", "info");

    if (this.dryRun) {
      this.log(
        "Running in DRY RUN mode - no changes will be made\n",
        "warning",
      );
    }

    const changes = [];

    if (args[0] === "--global") {
      // Global version bump only
      const releaseType = args[1];
      if (!releaseType) {
        this.log("Release type required for global bump", "error");
        return;
      }

      const globalChange = this.bumpGlobalVersion(releaseType);
      if (globalChange) {
        this.commitChanges(
          `feat(brandbook): bump global version to ${globalChange.newVersion}`,
        );
      }
    } else {
      // Module version bump
      const moduleName = args[0];
      const releaseType = args[1];

      if (!releaseType) {
        this.log("Release type required", "error");
        this.showUsage();
        return;
      }

      const change = this.bumpModuleVersion(moduleName, releaseType);
      if (change) {
        changes.push(change);

        // Assess global impact
        const globalImpact = this.assessGlobalImpact(changes);
        const globalChange = this.bumpGlobalVersion(globalImpact);

        // Commit all changes
        const commitMessage = globalChange
          ? `feat(${moduleName}): bump version to ${change.newVersion}, global to ${globalChange.newVersion}`
          : `feat(${moduleName}): bump version to ${change.newVersion}`;

        this.commitChanges(commitMessage);

        this.log("\n📋 Summary:", "info");
        this.log(
          `  Module: ${change.packageName} ${change.oldVersion} → ${change.newVersion}`,
          "success",
        );
        if (globalChange) {
          this.log(
            `  Global: ku6k-brandbook ${globalChange.oldVersion} → ${globalChange.newVersion}`,
            "success",
          );
        } else {
          this.log("  Global: No change needed", "info");
        }
      }
    }

    if (!this.dryRun) {
      this.log("\n🎉 Version bump complete!", "success");
      this.log("Don't forget to push your changes and tags:", "info");
      this.log("  git push origin main", "info");
      this.log("  git push --tags", "info");
    }
  }
}

// Run the version bumper
if (require.main === module) {
  const bumper = new VersionBumper();
  bumper.run();
}

module.exports = VersionBumper;
