# Changelog - Color Tokens

All notable changes to the Color Tokens module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added
- Initial release of KU6K color tokens
- Primary color system (oklch(0.52 0.13 144.17))
- Secondary color variants
- Accent color definitions
- Semantic color mappings (success, warning, error)
- Light mode color palette
- CSS custom properties format
- TypeScript token definitions

### Features
- 🎨 Complete light mode color system
- 🔧 CSS custom properties ready
- 📦 Multiple export formats (CSS, SCSS, JS, TS)
- ♿ WCAG AA compliant contrast ratios
- 🎯 Design token standard compliance

### Tokens Added
- `--primary`: Main brand color
- `--secondary`: Supporting brand color  
- `--accent`: Highlight and call-to-action color
- `--background`: Base background colors
- `--foreground`: Text and content colors
- `--border`: Border and separator colors
- `--muted`: Subdued content colors
- `--destructive`: Error and warning colors

## Version Guidelines

### PATCH (1.0.X)
- Hex value adjustments for accessibility
- Contrast ratio improvements
- Color temperature fine-tuning

### MINOR (1.X.0)  
- New color variants within existing families
- Additional semantic color mappings
- New color utilities or helpers

### MAJOR (X.0.0)
- Breaking changes to token names
- Color system restructuring
- Removal of existing tokens
