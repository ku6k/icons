# Changelog - Typography

All notable changes to the Typography module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added
- Initial release of KU6K typography system
- Inter font family with Google Fonts integration
- Modular scale typography system (1.25 ratio)
- Complete font weight scale (300-700)
- Line height and letter spacing definitions
- Comprehensive spacing scale
- Typography preset classes for common use cases

### Features
- 📝 Complete typography scale with semantic naming
- 🔤 Inter font family with fallback stack
- 📏 Modular scale for consistent sizing
- 🎯 Typography presets for headings and body text
- ⚡ Performance optimized with Google Fonts display swap
- 🎨 CSS custom properties with --ku6k- prefix

### Tokens Added
- Font families: `--ku6k-font-sans`, `--ku6k-font-mono`, `--ku6k-font-display`
- Font weights: `--ku6k-font-weight-light` through `--ku6k-font-weight-bold`
- Font sizes: `--ku6k-font-size-xs` through `--ku6k-font-size-6xl`
- Line heights: `--ku6k-line-height-none` through `--ku6k-line-height-loose`
- Letter spacing: `--ku6k-letter-spacing-tighter` through `--ku6k-letter-spacing-widest`
- Spacing scale: `--ku6k-space-0` through `--ku6k-space-32`

### Classes Added
- Heading presets: `.ku6k-heading-1` through `.ku6k-heading-6`
- Body text: `.ku6k-body-large`, `.ku6k-body`, `.ku6k-body-small`
- Utility classes: `.ku6k-caption`, `.ku6k-code`

## Version Guidelines

### PATCH (1.0.X)
- Font weight adjustments
- Line height fine-tuning
- Performance optimizations

### MINOR (1.X.0)
- New font sizes in existing scale
- Additional spacing tokens
- New typography presets

### MAJOR (X.0.0)
- Font family changes
- Typography scale restructuring
- Breaking changes to class names
