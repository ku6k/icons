# Dark Mode Integration Migration Guide

This guide helps you integrate dark mode color tokens into your existing KU6K implementation.

## Overview

The dark mode color tokens (`@ku6k/color-tokens-dark@2.0.0`) are implemented as a separate module that complements the light mode tokens (`@ku6k/color-tokens@1.0.0`).

## Installation

```bash
# Install dark mode tokens alongside light tokens
npm install @ku6k/color-tokens@^1.0.0 @ku6k/color-tokens-dark@^2.0.0
```

## Implementation Options

### Option 1: CSS-in-JS / Runtime Theming

```javascript
import lightTokens from '@ku6k/color-tokens/tokens/colors.css';
import darkTokens from '@ku6k/color-tokens-dark/tokens/colors-dark.css';

// Apply based on user preference
const theme = userPrefersDark ? darkTokens : lightTokens;
document.documentElement.className = userPrefersDark ? 'dark' : '';
```

### Option 2: CSS Custom Properties (Recommended)

```css
/* Import both token sets */
@import '@ku6k/color-tokens/tokens/colors.css';
@import '@ku6k/color-tokens-dark/tokens/colors-dark.css';

/* Your components automatically support both themes */
.button {
  background-color: var(--ku6k-primary);
  color: var(--ku6k-primary-foreground);
}
```

### Option 3: Build-Time Theme Selection

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@ku6k/theme': process.env.THEME === 'dark' 
        ? '@ku6k/color-tokens-dark' 
        : '@ku6k/color-tokens'
    }
  }
};
```

## Theme Switching Implementation

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('ku6k-theme') as 'light' | 'dark';
    
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('ku6k-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}
```

### Next.js with next-themes

```tsx
// pages/_app.tsx
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## Token Mapping

The dark mode tokens use the same custom property names with different values:

```css
/* Light mode (color-tokens@1.0.0) */
:root {
  --ku6k-primary: oklch(0.52 0.13 144.17);
  --ku6k-background: oklch(0.97 0.01 80.72);
}

/* Dark mode (color-tokens-dark@2.0.0) */
.dark {
  --ku6k-primary: oklch(0.58 0.15 144.17);
  --ku6k-background: oklch(0.15 0.01 74.42);
}
```

## Compatibility Layers

### Legacy Token Support

If you're using the old token names without the `ku6k-` prefix:

```css
/* Automatic compatibility aliases are included */
:root {
  --primary: var(--ku6k-primary);
  --background: var(--ku6k-background);
  /* ... */
}

.dark {
  --primary: var(--ku6k-primary);
  --background: var(--ku6k-background);
  /* ... */
}
```

### Gradual Migration

You can migrate incrementally by updating components one at a time:

```css
/* Old approach */
.button-old {
  background-color: var(--primary);
}

/* New approach with explicit ku6k tokens */
.button-new {
  background-color: var(--ku6k-primary);
}

/* Both work during migration period */
```

## Testing Dark Mode

### Automated Testing

```javascript
// jest test example
describe('Dark mode', () => {
  beforeEach(() => {
    document.documentElement.className = 'dark';
  });

  it('applies dark theme colors', () => {
    const button = document.querySelector('.button');
    const styles = getComputedStyle(button);
    
    expect(styles.backgroundColor).toBe('oklch(0.58 0.15 144.17)');
  });
});
```

### Manual Testing Checklist

- [ ] All interactive states (hover, focus, active) work in both themes
- [ ] Text contrast meets WCAG AA standards in both themes
- [ ] Images and illustrations look good in both themes
- [ ] Theme persistence works across page reloads
- [ ] System theme preference is respected
- [ ] Theme switching animation is smooth

## Common Issues

### Issue: Flashing on Initial Load
**Solution**: Set initial theme class on `<html>` element before React hydration

```html
<script>
  (function() {
    const theme = localStorage.getItem('ku6k-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.className = theme;
  })();
</script>
```

### Issue: Inconsistent Colors Across Components
**Solution**: Ensure all components use CSS custom properties, not hardcoded values

```css
/* ❌ Bad - hardcoded */
.button {
  background-color: #3b82f6;
}

/* ✅ Good - uses tokens */
.button {
  background-color: var(--ku6k-primary);
}
```

### Issue: Third-party Components Don't Support Dark Mode
**Solution**: Override their styles with CSS custom properties

```css
/* Override third-party component */
.third-party-component {
  background-color: var(--ku6k-card) !important;
  color: var(--ku6k-card-foreground) !important;
}
```

## Performance Considerations

### CSS Bundle Size
- Light tokens: ~2KB gzipped
- Dark tokens: ~2KB gzipped
- Combined: ~3.5KB gzipped (shared base)

### Runtime Performance
- CSS custom properties have excellent performance
- No JavaScript runtime cost for theme switching
- Browser handles theme changes natively

## Migration Timeline

### Week 1: Preparation
- [ ] Install dark mode token package
- [ ] Set up theme switching infrastructure
- [ ] Create testing environment

### Week 2: Core Components
- [ ] Migrate button, input, card components
- [ ] Test in both themes
- [ ] Update component documentation

### Week 3: Complex Components
- [ ] Migrate navigation, modals, forms
- [ ] Test interactive states
- [ ] Validate accessibility

### Week 4: Polish & Testing
- [ ] Fix edge cases and inconsistencies  
- [ ] Comprehensive testing across devices
- [ ] Performance optimization

## Next Steps

After successful dark mode integration:

1. Consider updating to `@ku6k/color-tokens@2.0.0` when available
2. Explore automatic theme generation tools
3. Implement seasonal or branded theme variants
4. Contribute improvements back to the brandbook

## Support

- [GitHub Issues](https://github.com/your-org/ku6k-brandbook/issues)
- [Discussion Forum](https://github.com/your-org/ku6k-brandbook/discussions)
- [Design System Team](mailto:design-system@yourcompany.com)
