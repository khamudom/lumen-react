# Lumen React

A reusable React + TypeScript component library for building dashboards and applications. Components are accessible by default, themeable via CSS variables, and tree-shakeable.

**Package:** `@khamudom/lumen-ui-react`

## Installation

```bash
npm install @khamudom/lumen-ui-react
```

Peer dependencies:

```bash
npm install react react-dom
```

## Usage

Import components from the package entry:

```tsx
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from "@khamudom/lumen-ui-react";
import "@khamudom/lumen-ui-react/styles.css";
```

### Button

```tsx
<Button variant="primary" onClick={() => console.log("clicked")}>
  Save changes
</Button>

<Button variant="destructive" loading>
  Deleting…
</Button>

<Button variant="outline" icon={<span>→</span>} iconPosition="end" fullWidth>
  Continue
</Button>
```

### Input

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

<Input label="Email" error="Enter a valid email address." />
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <p>$12,400</p>
  </CardContent>
</Card>
```

### Badge

```tsx
<Badge variant="success" appearance="tint">Active</Badge>
```

## Theming

Lumen ships with **light** and **dark** palettes defined in `tokens.css`. Components read design tokens via CSS variables, so switching themes does not require separate component variants.

### ThemeProvider (recommended)

Wrap your app with `ThemeProvider` to toggle themes at runtime:

```tsx
import {
  ThemeProvider,
  Button,
  useTheme,
} from "@khamudom/lumen-ui-react";
import "@khamudom/lumen-ui-react/styles.css";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {/* your app */}
    </ThemeProvider>
  );
}
```

`ThemeProvider` supports:

| Prop | Description |
|------|-------------|
| `defaultTheme` | `"light"`, `"dark"`, or `"system"` (default: `"light"`) |
| `theme` | Controlled theme preference |
| `onThemeChange` | Callback when the user changes theme |
| `storageKey` | Persist preference to `localStorage` (default: `"lumen-theme"`, set `false` to disable) |
| `enableGlobalTheme` | Apply theme to `<html>` and `<body>` (default: `true`) |

### Manual theme switching

Without React, set the theme on the document root:

```tsx
import { applyTheme } from "@khamudom/lumen-ui-react";

applyTheme("dark"); // or "light"
```

Or use CSS hooks directly:

```html
<html data-lumen-theme="dark" class="lumen-dark">
```

Scoped dark mode works on any ancestor:

```html
<div data-lumen-theme="dark" class="lumen-dark">
  <!-- dark-themed subtree -->
</div>
```

### Custom tokens

Override globally:

```css
:root {
  --lumen-color-primary: #7c3aed;
  --lumen-color-background: #0f172a;
  --lumen-color-text: #f8fafc;
}
```

Override a single component instance:

```css
.my-custom-button {
  --lumen-button-bg: #000;
  --lumen-button-color: #fff;
}
```

```tsx
<Button className="my-custom-button">Custom</Button>
```

## Project structure

```
src/
  components/
    Button/
    Input/
    Card/
    Badge/
  styles/
    tokens.css      # Design tokens
    globals.css     # Base utilities
  hooks/
  utils/
  index.ts          # Barrel exports
```

Each component folder contains:

- `Component.tsx` — implementation
- `Component.css` — plain CSS with `.lumen-*` classes
- `Component.stories.tsx` — Storybook docs
- `Component.test.tsx` — Vitest tests
- `index.ts` — public exports

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Build library in watch mode |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Static Storybook build |
| `npm run test` | Run Vitest component tests |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

## Local development

```bash
git clone <repository-url>
cd lumen-react
npm install
npm run storybook
```

### Linking into another app

From this package directory:

```bash
npm run build
npm link
```

In your consumer app:

```bash
npm link @khamudom/lumen-ui-react
```

Import styles in the consumer (if not bundled automatically):

```tsx
import "@khamudom/lumen-ui-react/styles.css";
```

## Publishing

1. Update version in `package.json`
2. Run `npm run build` and `npm run test`
3. Log in to npm: `npm login`
4. Publish: `npm publish --access public`

The `files` field publishes only `dist/`. React and React DOM remain peer dependencies.

## Tech stack

- React 18/19
- TypeScript
- Vite (library mode)
- Storybook
- Plain CSS + CSS variables
- ESLint + Prettier
- Vitest + Testing Library

## License

MIT
