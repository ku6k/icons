# KU6K Brandbook - Modular Design System

This brandbook implements a comprehensive modular versioning strategy using semantic versioning (semver) for each component of the KU6K design system.

## 🚀 Quick Start

```bash
# Install dependencies
cd brandbook && pnpm install

# Check version consistency
pnpm brandbook:version-check

# Bump a module version (dry run)
pnpm brandbook:version-bump color-tokens patch --dry-run

# Build all modules
pnpm brandbook:build
```

## 📦 Module Structure

Each module follows independent semantic versioning:

| Module | Package | Version | Description | Status |
|--------|---------|---------|-------------|---------|
| **Color Tokens** | `@ku6k/color-tokens` | `1.0.0` | Primary, secondary, accent colors | ✅ Active |
| **Dark Mode Colors** | `@ku6k/color-tokens-dark` | `2.0.0` | Dark theme companion tokens | 🚧 Future |
| **Typography** | `@ku6k/typography` | `1.0.0` | Fonts, headings, spacing | ✅ Active |
| **Iconography** | `@ku6k/iconography` | `1.0.0` | Icon sets and guidelines | ✅ Active |
| **Logos & Wordmarks** | `@ku6k/logos-wordmarks` | `1.0.0` | Brand identity assets | ✅ Active |
| **Brand Voice & Messaging** | `@ku6k/brand-voice` | `1.0.0` | Tone and messaging guidelines | ✅ Active |
| **Design Guidelines** | `@ku6k/design-guidelines` | `1.0.0` | Usage documentation | ✅ Active |

## 🎯 Global Brandbook Version

The global brandbook version (`@ku6k/brandbook@1.0.0`) tracks major milestone releases across all modules.

## 📊 Version Dependencies

```mermaid
graph TD
    A[ku6k-brandbook@1.0.0] --> B[color-tokens@1.0.0]
    A --> C[typography@1.0.0]
    A --> D[iconography@1.0.0]
    A --> E[logos-wordmarks@1.0.0]
    A --> F[brand-voice@1.0.0]
    A --> G[design-guidelines@1.0.0]
    B --> H[color-tokens-dark@2.0.0]
```

## 🛠️ Usage Examples

### Install Specific Modules

```bash
# Install individual modules
npm install @ku6k/color-tokens@^1.0.0
npm install @ku6k/typography@^1.0.0

# Install with dark mode support
npm install @ku6k/color-tokens@^1.0.0 @ku6k/color-tokens-dark@^2.0.0
```

### CSS Integration

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

### JavaScript Integration

```javascript
import colorTokens from '@ku6k/color-tokens';
import typographyTokens from '@ku6k/typography';

const theme = {
  colors: colorTokens,
  typography: typographyTokens
};
```

## ⚙️ Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **Version Check** | `pnpm brandbook:version-check` | Validate version consistency |
| **Version Bump** | `pnpm brandbook:version-bump <module> <type>` | Bump module version |
| **Build All** | `pnpm brandbook:build` | Build all modules |
| **Install Dependencies** | `pnpm brandbook:install` | Install module dependencies |

## 🏷️ Versioning Strategy

### Semantic Versioning Rules

- **PATCH** (x.x.X): Bug fixes, refinements, optimizations
- **MINOR** (x.X.x): New features, additional variants, non-breaking changes
- **MAJOR** (X.x.x): Breaking changes, architecture overhauls, incompatible updates

### GitHub Tagging

- **Module Tags**: `color-tokens-v1.2.1`
- **Global Tags**: `brandbook-v2.1.0`
- **Pre-release**: `typography-v2.0.0-beta.1`

## 🌙 Dark Mode Strategy

Dark mode is implemented as a separate module (`@ku6k/color-tokens-dark@2.0.0`) for independent versioning and evolution:

```css
/* Light mode (automatic) */
@import '@ku6k/color-tokens/tokens/colors.css';

/* Dark mode (when .dark class is present) */
@import '@ku6k/color-tokens-dark/tokens/colors-dark.css';
```

## 🤖 Automation

### GitHub Actions
- Automatic version detection on push to main
- Changelog generation with conventional commits
- Git tagging and GitHub releases
- Cross-module dependency validation

### Local Tools
- Version consistency checker
- Automated version bumping with impact assessment
- Build system with optimization pipeline

## 📚 Documentation

- **[Versioning Strategy](./docs/versioning-strategy.md)** - Comprehensive versioning rules and guidelines
- **[Module Guidelines](./docs/module-guidelines.md)** - Development standards and best practices
- **[Migration Guides](./docs/migrations/)** - Version upgrade assistance and breaking change guides
- **[VERSIONING_SUMMARY.md](./VERSIONING_SUMMARY.md)** - Complete overview in table format

## 🎨 Design Tokens

All modules use the `--ku6k-` prefix for CSS custom properties:

```css
/* Color tokens */
--ku6k-primary: oklch(0.52 0.13 144.17);
--ku6k-secondary: oklch(0.96 0.02 147.64);

/* Typography tokens */
--ku6k-font-sans: 'Inter', system-ui, sans-serif;
--ku6k-font-size-base: 1rem;

/* Spacing tokens */
--ku6k-space-4: 1rem;
--ku6k-space-8: 2rem;
```

## 🔄 Migration Support

Comprehensive migration guides are available for:
- [Dark Mode Integration](./docs/migrations/color-tokens/dark-mode-integration.md)
- Version upgrades with breaking changes
- Cross-module dependency updates
- Automated migration tools (planned)

## 🚨 Quality Assurance

- **Automated Testing**: Version validation and dependency checking
- **Linting**: Biome for code quality and consistency
- **Type Safety**: TypeScript definitions for all tokens
- **Performance**: Optimized builds and minimal runtime overhead

## 🛡️ Compatibility

- **Node.js**: >= 18.0.0
- **Browsers**: Modern browsers with CSS custom properties support
- **Frameworks**: Framework-agnostic (React, Vue, Angular, vanilla)
- **Build Tools**: Compatible with Vite, Webpack, Rollup, etc.

## 📈 Roadmap

- [ ] Automated migration CLI tools
- [ ] Visual regression testing for design tokens
- [ ] Figma plugin integration
- [ ] Advanced theme generation tools
- [ ] Performance monitoring and optimization

## 🤝 Contributing

1. Follow the [Module Guidelines](./docs/module-guidelines.md)
2. Use conventional commits for change tracking
3. Test thoroughly with `pnpm brandbook:version-check`
4. Update changelogs with breaking changes
5. Coordinate releases for dependent modules

## 📄 License

MIT License - see individual module packages for specific licensing terms.

---

*This brandbook provides a scalable, maintainable foundation for the KU6K design system with independent module evolution and comprehensive automation.*
