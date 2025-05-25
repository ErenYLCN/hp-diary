# Sass Folder Structure

This project follows a modern, scalable Sass architecture based on the 7-1 pattern (modified to 6-1 for this project).

## Folder Structure

```
src/styles/
├── abstracts/           # Sass tools and helpers
│   ├── _variables.scss  # CSS custom properties and Sass variables
│   └── _mixins.scss     # Sass mixins and functions
├── base/                # Base styles and resets
│   ├── _override.scss   # CSS reset and overrides
│   ├── _typography.scss # Typography styles
│   └── _utilities.scss  # Utility classes
├── components/          # Component-specific styles
│   ├── _buttons.scss    # Button component styles
│   ├── _forms.scss      # Form component styles
│   ├── _cards.scss      # Card component styles (example)
│   └── _modals.scss     # Modal component styles (example)
├── layout/              # Layout-specific styles
│   ├── _container.scss  # Container and layout utilities
│   ├── _header.scss     # Header layout (example)
│   ├── _footer.scss     # Footer layout (example)
│   └── _navigation.scss # Navigation layout (example)
├── pages/               # Page-specific styles
│   ├── _home.scss       # Home page styles (example)
│   └── _about.scss      # About page styles (example)
├── vendors/             # Third-party library styles
│   └── _normalize.scss  # Normalize.css (example)
└── main.scss            # Main file that imports all partials
```

## Key Features

### 1. CSS Custom Properties (CSS Variables)

- All design tokens are defined as CSS custom properties in `_variables.scss`
- Supports dark mode and theme switching
- Consistent spacing, colors, typography, and layout values

### 2. Comprehensive Reset (`_override.scss`)

- Removes default margins and padding
- Sets box-sizing to border-box for all elements
- Removes default styling from links, lists, buttons, and form elements
- Improves text rendering and accessibility

### 3. Utility Classes (`_utilities.scss`)

- Comprehensive set of utility classes for rapid development
- Flexbox and Grid utilities
- Spacing (margin/padding) utilities
- Typography utilities
- Display and positioning utilities
- Color and background utilities

### 4. Modern Mixins (`_mixins.scss`)

- Responsive breakpoint mixins
- Flexbox and Grid layout mixins
- Typography mixins (truncate, clamp)
- Focus and accessibility mixins
- Transition and animation mixins

### 5. Component Architecture

- Each component has its own partial file
- BEM-style naming convention
- Modular and reusable styles
- Easy to maintain and extend

## Usage

### Importing the Main Stylesheet

```tsx
// In your main.tsx
import "./styles/main.scss";
```

### Using Utility Classes

```tsx
<div className="d-flex justify-center align-center p-4 bg-white rounded-lg shadow-md">
  <button className="btn btn--primary">Click me</button>
</div>
```

### Using CSS Custom Properties

```scss
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-lg);
}
```

### Using Mixins

```scss
.my-component {
  @include flex-center;
  @include transition(all);
  @include focus-visible;

  @include tablet-up {
    font-size: var(--font-size-xl);
  }
}
```

## Best Practices

1. **Use CSS Custom Properties**: Always use CSS custom properties for colors, spacing, and other design tokens
2. **Component-First**: Create component-specific stylesheets for complex components
3. **Utility-First**: Use utility classes for simple styling and layout
4. **Responsive Design**: Use the provided responsive mixins for breakpoint-specific styles
5. **Accessibility**: Use focus-visible mixins and maintain proper contrast ratios
6. **Performance**: Import only the styles you need and avoid deep nesting (max 3 levels)

## Adding New Styles

### For a New Component

1. Create a new file in `components/` (e.g., `_modal.scss`)
2. Add the import to `main.scss`
3. Use BEM naming convention and CSS custom properties

### For a New Page

1. Create a new file in `pages/` (e.g., `_dashboard.scss`)
2. Add the import to `main.scss`
3. Use page-specific class prefixes

### For New Utilities

1. Add new utility classes to `_utilities.scss`
2. Follow the existing naming convention
3. Use `!important` for utility classes to ensure they override component styles

## Browser Support

This setup supports all modern browsers and uses:

- CSS Custom Properties (IE 11+ with polyfill)
- CSS Grid and Flexbox
- Modern CSS features with progressive enhancement
