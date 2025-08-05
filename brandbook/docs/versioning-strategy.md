# KU6K Brandbook - Versioning Strategy

## Overview

The KU6K brandbook implements a modular semantic versioning strategy where each component module maintains independent versions while the global brandbook tracks major milestone releases.

## Module Versioning Structure

### Version Naming Convention
- **Module Versions**: `<module>@<semver>` (e.g., `color-tokens@1.2.1`)
- **Global Version**: `ku6k-brandbook@<semver>` (e.g., `ku6k-brandbook@2.1.0`)
- **Pre-release**: `<module>@<semver>-<pre>` (e.g., `typography@2.0.0-beta.1`)

## Module-Specific Versioning Rules

| Module | PATCH (x.x.X) | MINOR (x.X.x) | MAJOR (X.x.x) |
|--------|---------------|---------------|---------------|
| **Color Tokens** | Hex value adjustments, contrast fixes | New color variants, accessibility improvements | Breaking token name changes, color system overhaul |
| **Dark Mode Colors** | Color refinements, contrast improvements | New dark mode variants, additional semantic colors | Breaking changes to dark theme structure |
| **Typography** | Font weight tweaks, line-height adjustments | New font sizes, spacing tokens | Font family changes, typography scale restructure |
| **Iconography** | Icon refinements, SVG optimizations | New icons added to existing sets | Icon style changes, naming convention overhaul |
| **Logos & Wordmarks** | Minor visual refinements | New logo variants, sizing options | Brand identity changes, logo redesigns |
| **Brand Voice & Messaging** | Copy refinements, typo fixes | New messaging guidelines, tone additions | Complete voice strategy changes |
| **Design Guidelines** | Documentation updates, examples | New component usage patterns | Fundamental design principle changes |

## GitHub Tagging Strategy

### Tag Formats
- **Module Tags**: `<module>-v<semver>` (e.g., `color-tokens-v1.2.1`)
- **Global Tags**: `brandbook-v<semver>` (e.g., `brandbook-v2.1.0`)
- **Pre-release Tags**: `<module>-v<semver>-<pre>` (e.g., `typography-v2.0.0-beta.1`)

### Tagging Workflow
1. Develop changes in feature branch: `feature/color-tokens-accessibility-fixes`
2. Test and validate module changes
3. Merge to main with conventional commits
4. Tag release: `git tag color-tokens-v1.0.1`
5. Assess global brandbook impact
6. Update global version if needed: `git tag brandbook-v1.1.0`

## Global Version Impact Rules

| Scenario | Global Version Impact | Example |
|----------|----------------------|---------|
| Single Module PATCH | No global version change | `color-tokens@1.0.1` → No global update |
| Single Module MINOR | Global PATCH increment | `typography@1.1.0` → `brandbook@1.0.1` |
| Single Module MAJOR | Global MINOR increment | `color-tokens@2.0.0` → `brandbook@1.1.0` |
| Multiple Module Updates | Global MINOR/MAJOR | Multiple changes → `brandbook@1.2.0` |
| Cross-Module Dependencies | Global MAJOR increment | Breaking changes across modules → `brandbook@2.0.0` |

## Dark Mode Versioning Strategy

### Separate Module Approach (Recommended)
```
color-tokens@1.0.0          (light mode)
color-tokens-dark@2.0.0     (dark mode companion)
```

**Benefits:**
- Independent versioning allows dark mode to evolve faster
- Clear separation of concerns
- Easier to track dark-specific changes
- Flexible adoption (projects can choose light-only)

**Implementation:**
- Dark mode tokens reference light mode tokens as peer dependencies
- Version sync guidance in documentation
- Migration tools for major version differences

### Alternative: Version Branch Strategy
```
color-tokens@1.0.0-light
color-tokens@1.0.0-dark
```

**Not recommended** due to complexity in branching and synchronization.

## Release Workflow

### 1. Development Phase
```bash
# Create feature branch
git checkout -b feature/color-tokens-new-variants

# Make changes to module
# Update module version in package.json
# Update CHANGELOG.md
```

### 2. Testing & Validation
```bash
# Run module tests
cd brandbook/modules/color-tokens
pnpm test

# Validate against consumers
pnpm run validate-consumers
```

### 3. Release Process
```bash
# Merge to main
git checkout main
git merge feature/color-tokens-new-variants

# Tag module release
git tag color-tokens-v1.1.0
git push origin color-tokens-v1.1.0

# Assess global impact
node scripts/assess-global-impact.js

# Update global version if needed
git tag brandbook-v1.0.1
git push origin brandbook-v1.0.1
```

### 4. Documentation & Communication
- Generate automated changelog
- Update module documentation
- Notify consumers of breaking changes
- Publish migration guides for MAJOR versions

## Change Tracking Best Practices

### Conventional Commits
```bash
# Module-specific commits
feat(color-tokens): add new primary color variants
fix(typography): improve line-height calculations
BREAKING CHANGE(iconography): rename icon prefix from 'ku6k-' to 'ku6k--'

# Global commits
feat(brandbook): add dark mode support across all modules
docs(brandbook): update migration guide for v2.0.0
```

### Changelog Format
Each module maintains a dedicated `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [1.1.0] - 2025-01-15

### Added
- New primary color variants (50-900 scale)
- Semantic success/warning/error tokens

### Changed
- Improved contrast ratios for accessibility compliance
- Updated OKLCH values for better color reproduction

### Fixed
- Corrected border color inconsistencies

### Breaking Changes
- None
```

### Version Dependencies Matrix
Track module interdependencies:

```json
{
  "dependencies": {
    "color-tokens": "^1.0.0",
    "color-tokens-dark": "^2.0.0",
    "typography": "^1.0.0"
  },
  "compatibility": {
    "color-tokens@1.x": ["typography@1.x", "iconography@1.x"],
    "color-tokens@2.x": ["typography@2.x", "iconography@1.x"]
  }
}
```

## Automated Tooling

### Version Bump Script
```javascript
// scripts/version-bump.js
const semver = require('semver');
const { execSync } = require('child_process');

function bumpModuleVersion(moduleName, releaseType) {
  const currentVersion = getCurrentVersion(moduleName);
  const newVersion = semver.inc(currentVersion, releaseType);
  
  updatePackageJson(moduleName, newVersion);
  updateChangelog(moduleName, newVersion);
  createGitTag(`${moduleName}-v${newVersion}`);
  
  assessGlobalImpact(moduleName, releaseType);
}
```

### Global Impact Assessment
```javascript
// scripts/assess-global-impact.js
function assessGlobalImpact(moduleName, changeType) {
  const rules = {
    'PATCH': null,           // No global version change
    'MINOR': 'patch',        // Global patch increment
    'MAJOR': 'minor'         // Global minor increment
  };
  
  const globalImpact = rules[changeType];
  if (globalImpact) {
    bumpGlobalVersion(globalImpact);
  }
}
```

## Migration Support

### Breaking Change Notifications
For MAJOR version releases, provide:
- **Migration guide** with step-by-step instructions
- **Codemod scripts** for automated updates
- **Deprecation warnings** in previous minor versions
- **Side-by-side examples** showing before/after

### Version Compatibility
Maintain compatibility matrix:
```markdown
## Compatibility Matrix

| Module | v1.x | v2.x | v3.x |
|--------|------|------|------|
| color-tokens | ✅ | ✅ | 🚧 |
| typography | ✅ | ✅ | ❌ |
| iconography | ✅ | ❌ | ❌ |
```

Legend:
- ✅ Fully supported
- 🚧 Limited support (migration available)
- ❌ Not supported (breaking changes)

## Best Practices Summary

1. **Use conventional commits** for clear change tracking
2. **Test thoroughly** before releases, especially MAJOR versions
3. **Document breaking changes** with migration paths
4. **Maintain backward compatibility** when possible
5. **Coordinate releases** for dependent modules
6. **Communicate changes** to consumers early
7. **Version dependencies** explicitly in package.json
8. **Archive old versions** with clear EOL dates
