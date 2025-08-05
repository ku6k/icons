# KU6K Brandbook Module Guidelines

## Module Structure Standards

Each brandbook module follows a consistent structure for maintainability and discoverability.

### Required Files

```
brandbook/modules/<module-name>/
├── package.json          # Module metadata and dependencies
├── CHANGELOG.md          # Version history and breaking changes
├── README.md            # Module-specific documentation
├── build.js             # Build script for token generation
├── tokens/              # Source design tokens
│   ├── *.css           # CSS custom properties
│   ├── *.json          # JSON token definitions
│   └── *.ts            # TypeScript token exports
├── dist/               # Built/compiled outputs
│   ├── index.js        # Main JavaScript export
│   ├── index.d.ts      # TypeScript definitions
│   ├── css/            # Compiled CSS files
│   └── json/           # Processed JSON tokens
└── docs/               # Module-specific documentation
    ├── usage.md        # Usage examples
    └── api.md          # API reference
```

## Module Categories

### 1. Token Modules
**Purpose**: Define design tokens (colors, typography, spacing)
**Examples**: `color-tokens`, `typography`, `spacing`

**Required Structure**:
```
tokens/
├── colors.css          # CSS custom properties
├── colors.json         # JSON token definitions  
├── colors.ts           # TypeScript exports
└── index.ts            # Main token export
```

**Versioning Rules**:
- **PATCH**: Value adjustments, contrast fixes
- **MINOR**: New token variants, additional semantic tokens
- **MAJOR**: Token name changes, structural overhauls

### 2. Asset Modules
**Purpose**: Provide brand assets (logos, icons, illustrations)
**Examples**: `iconography`, `logos-wordmarks`, `illustrations`

**Required Structure**:
```
assets/
├── svg/                # Source SVG files
├── png/                # Rasterized versions
├── webp/               # Optimized web formats
└── sprite.svg          # Icon sprite (for icons)
```

**Versioning Rules**:
- **PATCH**: Asset optimizations, minor visual fixes
- **MINOR**: New assets added to existing sets
- **MAJOR**: Style changes, naming convention updates

### 3. Documentation Modules
**Purpose**: Provide guidelines and best practices
**Examples**: `brand-voice`, `design-guidelines`, `accessibility`

**Required Structure**:
```
guidelines/
├── content.md          # Main guidelines content
├── examples/           # Usage examples
└── templates/          # Reusable templates
```

**Versioning Rules**:
- **PATCH**: Copy improvements, typo fixes, example updates
- **MINOR**: New guidelines sections, additional examples
- **MAJOR**: Fundamental guideline changes, strategy overhauls

## Package.json Standards

### Required Fields
```json
{
  "name": "@ku6k/<module-name>",
  "version": "1.0.0",
  "description": "Brief description of module purpose",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "tokens", "assets", "CHANGELOG.md"],
  "keywords": ["ku6k", "brandbook", "design-tokens"],
  "scripts": {
    "build": "node build.js",
    "test": "echo 'No tests specified'",
    "lint": "echo 'No linting specified'"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Naming Conventions
- Package name: `@ku6k/<module-name>`
- Module directory: `<module-name>` (kebab-case)
- Exports: `ku6k<ModuleName>` (camelCase)
- CSS variables: `--ku6k-<token-name>` (kebab-case)

## Build System Requirements

### Build Script Template

```javascript
// build.js
const fs = require('fs');
const path = require('path');

class ModuleBuilder {
  constructor() {
    this.srcDir = path.join(__dirname, 'tokens');
    this.distDir = path.join(__dirname, 'dist');
  }

  async build() {
    console.log(`Building ${require('./package.json').name}...`);
    
    // Ensure dist directory exists
    if (!fs.existsSync(this.distDir)) {
      fs.mkdirSync(this.distDir, { recursive: true });
    }

    // Process tokens
    await this.processTokens();
    
    // Generate exports
    await this.generateExports();
    
    console.log('Build complete!');
  }

  async processTokens() {
    // Implementation specific to module type
  }

  async generateExports() {
    // Generate index.js and index.d.ts
  }
}

if (require.main === module) {
  new ModuleBuilder().build().catch(console.error);
}
```

### Export Standards

#### CSS Export Example
```css
/* dist/css/colors.css */
/**
 * KU6K Color Tokens v1.0.0
 * Generated automatically - do not edit
 */
:root {
  --ku6k-primary: oklch(0.52 0.13 144.17);
  /* ... */
}
```

#### TypeScript Export Example
```typescript
// dist/index.d.ts
export interface KU6KColorTokens {
  primary: string;
  secondary: string;
  accent: string;
}

export declare const colorTokens: KU6KColorTokens;
export default colorTokens;
```

#### JavaScript Export Example
```javascript
// dist/index.js
const colorTokens = {
  primary: 'oklch(0.52 0.13 144.17)',
  secondary: 'oklch(0.96 0.02 147.64)',
  accent: 'oklch(0.9 0.05 146.04)'
};

module.exports = colorTokens;
module.exports.default = colorTokens;
```

## Documentation Standards

### README.md Template

```markdown
# @ku6k/<module-name>

Brief description of the module and its purpose.

## Installation

\`\`\`bash
npm install @ku6k/<module-name>
\`\`\`

## Usage

### CSS Import
\`\`\`css
@import '@ku6k/<module-name>/dist/css/tokens.css';
\`\`\`

### JavaScript Import
\`\`\`javascript
import tokens from '@ku6k/<module-name>';
\`\`\`

## Tokens

List of available tokens with descriptions.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

MIT
```

### CHANGELOG.md Template

```markdown
# Changelog - <Module Name>

All notable changes to this module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [1.0.0] - 2025-01-01

### Added
- Initial release of <module-name>
- Core token definitions
- TypeScript support
- CSS custom properties

## Version Guidelines

### PATCH (x.x.X)
- Description of patch-level changes

### MINOR (x.X.x)
- Description of minor-level changes

### MAJOR (X.x.x)
- Description of major-level changes
```

## Quality Standards

### Code Quality
- All modules must build without errors
- TypeScript definitions must be accurate
- CSS must be valid and minified
- JSON must be valid and formatted

### Testing Requirements
- Token validation (correct format, no duplicates)
- Build process verification
- Export integrity checks
- Version consistency validation

### Performance Standards
- CSS files: < 50KB uncompressed
- JSON files: < 100KB uncompressed
- Build time: < 30 seconds per module
- Zero runtime dependencies where possible

## Release Process

### Pre-release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md reflects changes
- [ ] Version bump is appropriate
- [ ] Build artifacts are current

### Release Steps
1. Update version in package.json
2. Update CHANGELOG.md with release date
3. Run build and test
4. Commit changes with conventional commit message
5. Create git tag: `<module-name>-v<version>`
6. Push tag to trigger CI/CD

### Post-release Tasks
- [ ] Verify NPM package publication
- [ ] Update dependent modules if needed
- [ ] Notify consumers of breaking changes
- [ ] Update documentation site

## Module Dependencies

### Allowed Dependencies
- **Peer Dependencies**: Other `@ku6k/*` modules
- **Dev Dependencies**: Build tools, testing utilities
- **Zero Runtime Dependencies** (preferred)

### Dependency Guidelines
- Minimize external dependencies
- Use peer dependencies for inter-module relationships
- Pin exact versions for build tools
- Document dependency rationale

### Example Dependency Structure
```json
{
  "peerDependencies": {
    "@ku6k/color-tokens": "^1.0.0"
  },
  "devDependencies": {
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## Validation Tools

### Module Validator Script
Each module should include validation:

```javascript
// scripts/validate.js
const fs = require('fs');
const path = require('path');

function validateModule() {
  const pkg = require('../package.json');
  const errors = [];

  // Check required files
  const requiredFiles = ['package.json', 'CHANGELOG.md', 'README.md'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, '..', file))) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  // Check package.json structure
  if (!pkg.name.startsWith('@ku6k/')) {
    errors.push('Package name must start with @ku6k/');
  }

  // Check version format
  if (!/^\d+\.\d+\.\d+/.test(pkg.version)) {
    errors.push('Invalid version format');
  }

  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(error => console.error(`  ❌ ${error}`));
    process.exit(1);
  }

  console.log('✅ Module validation passed');
}

if (require.main === module) {
  validateModule();
}
```

## Best Practices Summary

1. **Consistency**: Follow established patterns and naming conventions
2. **Documentation**: Every token/asset should have clear documentation
3. **Backward Compatibility**: Avoid breaking changes when possible
4. **Performance**: Optimize for build time and bundle size
5. **Accessibility**: Ensure all tokens meet accessibility standards
6. **Testing**: Validate outputs and maintain quality standards
7. **Versioning**: Use semantic versioning consistently
8. **Dependencies**: Minimize and document external dependencies
