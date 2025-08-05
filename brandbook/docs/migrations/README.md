# KU6K Brandbook Migration Guides

This directory contains migration guides for major version changes across all brandbook modules.

## Available Migration Guides

### Color Tokens
- [v1.x to v2.x](./color-tokens/v1-to-v2.md) - Major color system overhaul
- [Dark Mode Integration](./color-tokens/dark-mode-integration.md) - Adding dark mode support

### Typography  
- [v1.x to v2.x](./typography/v1-to-v2.md) - Font family and scale changes

### Iconography
- [v1.x to v2.x](./iconography/v1-to-v2.md) - Icon naming convention updates

### Global Brandbook
- [v1.x to v2.x](./brandbook/v1-to-v2.md) - Overall brandbook structure changes

## Migration Process

### Before You Start
1. **Backup your current implementation**
2. **Review the breaking changes** in the relevant guide
3. **Test in a development environment** first
4. **Plan your migration timeline** - some changes may require coordination

### General Migration Steps
1. Update package versions in your `package.json`
2. Run the automated migration tool (if available)
3. Manual updates following the migration guide
4. Test thoroughly in all target environments
5. Update your documentation

### Getting Help
- Check the [FAQ](./faq.md) for common issues
- Review [compatibility matrix](../versioning-strategy.md#compatibility-matrix)
- Open an issue if you encounter problems

## Automated Migration Tools

```bash
# Install migration CLI tool
npm install -g @ku6k/migration-tools

# Run migration assistant
ku6k-migrate --from=1.0.0 --to=2.0.0 --module=color-tokens

# Dry run to see what would change
ku6k-migrate --dry-run --from=1.0.0 --to=2.0.0
```

## Version Support Timeline

| Version | Support Status | End of Life |
|---------|---------------|-------------|
| v1.x | ✅ Active | 2026-01-01 |
| v2.x | 🚧 Beta | TBD |
| v3.x | 📋 Planned | TBD |

Legend:
- ✅ Active support (bug fixes, security updates)
- 🚧 Beta/RC (testing phase)
- 📋 Planned (development phase)
- ❌ End of life (no further updates)
