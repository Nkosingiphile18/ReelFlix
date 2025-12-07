# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Notes on click ripple positioning (HeroUI + Tailwind)

If you're using HeroUI components with Tailwind, you might notice the ripple/click effect appears misaligned when clicking on child elements within a button (e.g., icons, spans). This is because the event target may be the child element rather than the button itself, and the ripple coordinates can be calculated relative to the child.

To align ripple effects correctly across the app, we added a CSS rule in `src/index.css` to prevent inner elements from capturing pointer events on pressable controls:

```css
[data-react-aria-pressable] > * {
	pointer-events: none;
}
```

This forces clicks to be reported on the parent (the pressable control) so the calculated coordinates match the component's bounds. If you have interactive child elements (e.g., nested links) that need pointer events, adjust the CSS or add targeted selectors to avoid disabling events for those children.
