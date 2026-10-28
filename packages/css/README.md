# `@workspace/css`

Import the theme package once in your app entry point (for Next.js, `app/layout.tsx`):

```tsx
import "@workspace/css/themes/all.css"
```

Then set the selected theme on the root `<html>` element. The CSS scopes every token set to its matching attribute, so themes do not override one another:

```tsx
<html lang="en" data-theme="blue">
```

The existing `dark` class can stay on `<html>`; each theme stylesheet provides both light and dark tokens. For a fixed theme, import only that stylesheet instead:

```tsx
import "@workspace/css/themes/blue.css"
```

Available themes: [amber](src/themes/amber.css), [blue](src/themes/blue.css), [cyan](src/themes/cyan.css), [emerald](src/themes/emerald.css), [fuchsia](src/themes/fuchsia.css), [green](src/themes/green.css), [indigo](src/themes/indigo.css), [lime](src/themes/lime.css), [neutral](src/themes/neutral.css), [orange](src/themes/orange.css), [pink](src/themes/pink.css), [purple](src/themes/purple.css), [red](src/themes/red.css), [rose](src/themes/rose.css), [sky](src/themes/sky.css), [teal](src/themes/teal.css), [violet](src/themes/violet.css), [yellow](src/themes/yellow.css).

The shared Tailwind globals are available as `@workspace/css/globals.css`, and the PostCSS config as `@workspace/css/postcss.config`. Add this internal workspace package to another workspace app with `"@workspace/css": "workspace:*"`.
