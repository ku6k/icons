# KU6K Brandbook - Modular Versioning Strategy Summary

## Overview

This document provides a comprehensive summary of the modular brandbook versioning strategy implemented for the KU6K design system.

## Module Structure & Versions

| Module | Package Name | Version | Description | Status |
|--------|-------------|---------|-------------|---------|
| **Color Tokens** | `@ku6k/color-tokens` | `1.0.0` | Primary, secondary, accent colors (light mode) | ✅ Active |
| **Dark Mode Colors** | `@ku6k/color-tokens-dark` | `2.0.0` | Dark theme companion tokens (future) | 🚧 Future |
| **Typography** | `@ku6k/typography` | `1.0.0` | Fonts, headings, spacing scales | ✅ Active |
| **Iconography** | `@ku6k/iconography` | `1.0.0` | Icon sets and guidelines | ✅ Active |
| **Logos & Wordmarks** | `@ku6k/logos-wordmarks` | `1.0.0` | Brand identity assets | ✅ Active |
| **Brand Voice & Messaging** | `@ku6k/brand-voice` | `1.0.0` | Tone and communication guidelines | ✅ Active |
| **Design Guidelines** | `@ku6k/design-guidelines` | `1.0.0` | Usage documentation and best practices | ✅ Active |
| **Global Brandbook** | `@ku6k/brandbook` | `1.0.0` | Orchestrates all modules | ✅ Active |

## Versioning Rules Matrix

| Module Type | PATCH (x.x.X) | MINOR (x.X.x) | MAJOR (X.x.x) |
|-------------|---------------|---------------|---------------|
| **Color Tokens** | Hex value adjustments, contrast fixes | New color variants, accessibility improvements | Breaking token name changes, color system overhaul |
| **Dark Mode Colors** | Color refinements, contrast improvements | New dark mode variants, additional semantic colors | Breaking changes to dark theme structure |
| **Typography** | Font weight tweaks, line-height adjustments | New font sizes, spacing tokens | Font family changes, typography scale restructure |
| **Iconography** | Icon refinements, SVG optimizations | New icons added to existing sets | Icon style changes, naming convention overhaul |
| **Logos & Wordmarks** | Minor visual refinements | New logo variants, sizing options | Brand identity changes, logo redesigns |
| **Brand Voice & Messaging** | Copy refinements, typo fixes | New messaging guidelines, tone additions | Complete voice strategy changes |
| **Design Guidelines** | Documentation updates, examples | New component usage patterns | Fundamental design principle changes |

## GitHub Tagging Strategy

| Tag Type | Format | Example | Purpose |
|----------|--------|---------|---------|
| **Module Tags** | `<module>-v<semver>` | `color-tokens-v1.2.1` | Track individual module releases |
| **Global Tags** | `brandbook-v<semver>` | `brandbook-v2.1.0` | Major brandbook milestone releases |
| **Pre-release Tags** | `<module>-v<semver>-<pre>` | `typography-v2.0.0-beta.1` | Testing new features |

## Global Version Impact Rules

| Scenario | Global Version Impact | Example | Reasoning |
|----------|----------------------|---------|-----------|
| **Single Module PATCH** | No global version change | `color-tokens@1.0.1` → No global update | Minor fixes don't affect overall brandbook |
| **Single Module MINOR** | Global PATCH increment | `typography@1.1.0` → `brandbook@1.0.1` | New features may warrant documentation update |
| **Single Module MAJOR** | Global MINOR increment | `color-tokens@2.0.0` → `brandbook@1.1.0` | Breaking changes require brandbook guidance update |
| **Multiple Module Updates** | Global MINOR/MAJOR | Multiple changes → `brandbook@1.2.0` | Coordinated releases suggest significant evolution |
| **Cross-Module Dependencies** | Global MAJOR increment | When changes affect multiple modules | Indicates fundamental brandbook restructuring |

## Dark Mode Strategy

| Approach | Implementation | Pros | Cons | Recommendation |
|----------|---------------|------|------|----------------|
| **Separate Module** | `color-tokens@1.0.0` + `color-tokens-dark@2.0.0` | Independent versioning, clear separation | Potential sync issues | ✅ **Recommended** |
| **Version Branch** | `color-tokens@1.0.0-light` + `color-tokens@1.0.0-dark` | Synchronized versioning | Complex branching strategy | ❌ Not recommended |
| **Token Extension** | Single package with light/dark variants | Unified versioning | Monolithic structure | 🤔 Alternative approach |

## Automation & Tooling

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **Version Check** | `pnpm brandbook:version-check` | Validate version consistency across modules |
| **Version Bump** | `pnpm brandbook:version-bump <module> <type>` | Bump module version with automatic changelog |
| **Build All** | `pnpm brandbook:build` | Build all modules |
| **Install Dependencies** | `pnpm brandbook:install` | Install all module dependencies |

### GitHub Actions Workflow

- **Trigger**: Push to `main` branch with changes in `brandbook/modules/**`
- **Process**: Automatic version detection, changelog generation, git tagging
- **Output**: GitHub releases with detailed change documentation

## Migration Support

### Available Guides

| Migration | Guide Location | Status |
|-----------|---------------|--------|
| **Dark Mode Integration** | `brandbook/docs/migrations/color-tokens/dark-mode-integration.md` | ✅ Complete |
| **v1.x to v2.x (Color Tokens)** | `brandbook/docs/migrations/color-tokens/v1-to-v2.md` | 📋 Planned |
| **Typography Overhaul** | `brandbook/docs/migrations/typography/v1-to-v2.md` | 📋 Planned |
| **Global Brandbook v2** | `brandbook/docs/migrations/brandbook/v1-to-v2.md` | 📋 Planned |

### Migration Tools

```bash
# Install migration CLI (future)
npm install -g @ku6k/migration-tools

# Run migration assistant
ku6k-migrate --from=1.0.0 --to=2.0.0 --module=color-tokens

# Dry run to preview changes
ku6k-migrate --dry-run --from=1.0.0 --to=2.0.0
```

## Usage Examples

### Installing Specific Modules

```bash
# Install individual modules
npm install @ku6k/color-tokens@^1.0.0
npm install @ku6k/typography@^1.0.0

# Install with dark mode support
npm install @ku6k/color-tokens@^1.0.0 @ku6k/color-tokens-dark@^2.0.0

# Install all modules
npm install @ku6k/brandbook@^1.0.0
```

### Using in CSS

```css
/* Import tokens */
@import '@ku6k/color-tokens/tokens/colors.css';
@import '@ku6k/typography/tokens/typography.css';

/* Use tokens */
.button {
  background-color: var(--ku6k-primary);
  font-family: var(--ku6k-font-sans);
  font-size: var(--ku6k-font-size-base);
}
```

### Using in JavaScript

```javascript
import colorTokens from '@ku6k/color-tokens';
import typographyTokens from '@ku6k/typography';

const theme = {
  colors: colorTokens,
  typography: typographyTokens
};
```

## File Structure

```
brandbook/
├── package.json                    # Global brandbook configuration
├── README.md                      # Main brandbook documentation
├── VERSIONING_SUMMARY.md          # This file
├── docs/                          # Comprehensive documentation
│   ├── versioning-strategy.md     # Detailed versioning rules
│   ├── module-guidelines.md       # Module development standards
│   └── migrations/                # Migration guides
│       ├── README.md
│       └── color-tokens/
│           └── dark-mode-integration.md
├── scripts/                       # Automation tools
│   ├── version-check.js           # Version validation
│   └── version-bump.js            # Automated version bumping
└── modules/                       # Individual brandbook modules
    ├── color-tokens/
    │   ├── package.json
    │   ├── CHANGELOG.md
    │   └── tokens/
    │       └── colors.css
    ├── color-tokens-dark/
    │   ├── package.json
    │   └── tokens/
    │       └── colors-dark.css
    ├── typography/
    │   ├── package.json
    │   └── tokens/
    │       └── typography.css
    └── [other modules...]
```

## Best Practices

### Version Management
1. **Use semantic versioning consistently** across all modules
2. **Test thoroughly** before releases, especially MAJOR versions
3. **Document breaking changes** with clear migration paths
4. **Coordinate releases** for dependent modules
5. **Communicate changes** to consumers early and clearly

### Module Development
1. **Follow naming conventions** (`@ku6k/module-name`)
2. **Maintain consistent structure** across all modules
3. **Provide comprehensive documentation** for each token/asset
4. **Validate outputs** with automated testing
5. **Optimize for performance** (build time and bundle size)

### Release Process
1. **Feature branch** → **Testing** → **Main branch**
2. **Conventional commits** for change tracking
3. **Automated versioning** through GitHub Actions
4. **Manual review** for MAJOR version releases
5. **Post-release communication** to stakeholders

## Support & Resources

### Documentation
- [Versioning Strategy](./docs/versioning-strategy.md) - Comprehensive versioning rules
- [Module Guidelines](./docs/module-guidelines.md) - Development standards
- [Migration Guides](./docs/migrations/) - Version upgrade assistance

### Automation
- [GitHub Actions Workflow](../.github/workflows/brandbook-versioning.yml)
- [Version Check Script](./scripts/version-check.js)
- [Version Bump Script](./scripts/version-bump.js)

### Getting Help
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for questions and community support
- Design System Team for direct consultation

---

*This summary reflects the current state of the KU6K brandbook versioning strategy as of January 2025. For the most up-to-date information, refer to the individual module documentation and changelog files.*
