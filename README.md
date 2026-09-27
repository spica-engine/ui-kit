# oziko-ui-kit

A reusable React 19 component library that standardizes UI building blocks across Spica-based projects. It ships a broad set of typed components — from layout primitives and form inputs to tables, dashboards, charts and maps — together with a lightweight, CSS-variable-based theming system.

The package is published to npm as [`oziko-ui-kit`](https://www.npmjs.com/package/oziko-ui-kit).

## Overview

`oziko-ui-kit` provides a single, consistent component layer so applications don't re-implement common UI concerns. Components are organized following atomic design (atoms → molecules → organisms) and exported from one entry point with full TypeScript types.

It is intended for developers building React 19 applications (particularly within the Spica ecosystem) who want ready-made, themeable components including schema-driven inputs, data tables, dashboards, and rich-text/map/chart widgets.

## Features

- **Layout primitives** — `FlexElement`, `FluidContainer` for composable, flex-based layouts.
- **Form inputs (two variants)** — full "normal" inputs and compact "minimized" inputs for: string, number, boolean, date, color, array, object, enum, location, storage, rich text, multi-selection, and relations.
- **Form & display atoms** — `Button`, `Icon`, `Checkbox`, `Switch`, `Chip`, `Select`, `Autocomplete`, `DatePicker`, `ColorPicker`, `Text`, `Title`, `ListItem`, `ListRow`.
- **Overlays** — `Modal`, `Drawer`, `Popover`, `Backdrop`, `Portal`, `Tab`.
- **Data & organisms** — `Table`, `Dashboard` (grid layout), `Section`, `MenuGroup`, `Timeline`, `Chart`, `Map`, and a `Notification` provider/hook.
- **Bucket/schema helpers** — `BucketFieldPopup`, `BucketSchemaItem`, `BucketSchemaList`.
- **Custom hooks** — `useInputRepresenter`, `useKeyDown`, `useOnClickOutside`, `useAdaptivePosition`.
- **Theming** — `createTheme` / `useTheme`, driven by CSS custom properties.
- **Utilities** — `apiUtil`, `colorUtil`, `helperUtils`, `timeUtil`, plus shared TypeScript interfaces.

## Tech Stack

**Core**
- React 19, TypeScript 5, Sass/SCSS

**Feature libraries**
- Lexical — rich-text inputs
- Chart.js + react-chartjs-2 — charts and timeline
- Leaflet + react-leaflet — maps and location inputs
- Formik — form state
- react-grid-layout, react-draggable, react-resizable — dashboard layout
- react-dropzone — file uploads
- date-fns, lodash

**Tooling**
- Rollup (with peer-deps-external, PostCSS, terser, url, copy plugins) — library bundling
- Create React App via `react-scripts` + `react-app-rewired` — local development
- Prettier — formatting
- `tsc-alias` — path-alias resolution in emitted types

## Getting Started

### Prerequisites

- Node.js 20+ (the CI pipeline builds and publishes on Node 20)
- Yarn (this repository uses a `yarn.lock`)
- React 19 and React DOM 19 in the consuming application (declared as peer dependencies)

### Installation (in your application)

```bash
yarn add oziko-ui-kit
# or
npm install oziko-ui-kit
```

`react` and `react-dom` (`^19.0.0`) must already be installed in your project.

## Usage

Import components from the package root. Component styles are bundled with the package (CSS is extracted to `dist/index.css`), so importing a component brings in the styles it needs.

```tsx
import { Button, FlexElement } from "oziko-ui-kit";

export function Example() {
  return (
    <FlexElement>
      <Button>Click me</Button>
    </FlexElement>
  );
}
```

### Theming

`createTheme` resolves a (partial) theme and applies it by setting CSS custom properties on the document root, which the components read. Call it once at application startup:

```tsx
import { createTheme } from "oziko-ui-kit";

createTheme({
  palette: {
    primary: "#1c1c50",
    background: "#f5f5f5",
  },
  fontFamily: "Inter",
});
```

`useTheme` is also exported for reading the resolved theme from React context where a theme provider is in place.

## Local Development

This repository is developed with Create React App (via `react-app-rewired`). To work on the components locally:

```bash
git clone https://github.com/spica-engine/ui-kit.git
cd ui-kit
yarn install
yarn start
```

`yarn start` launches the CRA dev server. Path aliases (`@atoms`, `@molecules`, `@custom-hooks`, `@utils`) are configured in `config-overrides.js` and `tsconfig.json`.

## Available Scripts

| Script | Description |
| --- | --- |
| `yarn start` | Start the CRA development server (`react-app-rewired start`). |
| `yarn build` | Create a CRA production build (`react-app-rewired build`). |
| `yarn rollup` | Bundle the distributable library into `build/` (runs `rollup -c`, then strips the `@charset` rule from the extracted CSS). This is what CI runs before publishing. |
| `yarn test` | Run the CRA/Jest test runner (`react-app-rewired test`). Note: the repository currently contains no test files. |
| `yarn format` | Format `src/**` with Prettier. |

## Project Structure

```text
.
├── src/
│   ├── components/
│   │   ├── atoms/         # smallest building blocks (buttons, inputs, icons, …)
│   │   ├── molecules/     # composed atoms (accordion, select, timeline, …)
│   │   └── organisms/     # complex units (table, dashboard, notification, …)
│   ├── custom-hooks/      # reusable React hooks
│   ├── theme/             # createTheme, useTheme, palette + CSS-variable logic
│   ├── utils/             # api, color, time, helper utilities and shared types
│   ├── styles/            # shared/global SCSS
│   ├── assets/            # fonts and images
│   └── index.export.ts    # public library entry point (barrel of all exports)
├── config-overrides.js    # CRA overrides (path aliases)
├── rollup.config.js       # library bundling configuration
├── tsconfig.json
└── package.json
```

The public API is defined entirely by `src/index.export.ts`. `src/index.tsx` and `src/App.tsx` exist only to run the local CRA dev environment and are excluded from the library build.

## Building the Library

```bash
yarn rollup
```

This produces the publishable bundle in `build/`:
- `build/dist/index.mjs` — ESM bundle (with sourcemap)
- `build/dist/index.css` — extracted styles
- type declarations and copied assets (including Leaflet marker images)
- `build/package.json` — the package manifest used for publishing

## Release & Publishing

Publishing is automated through GitHub Actions:

- **`bump-version.yaml`** — on every push to the `dev` branch, the latest `vMAJOR.MINOR.PATCH` git tag is read, the patch number is incremented, and the new tag is pushed.
- **`publish.yaml`** — when a `v*` tag is pushed, the workflow installs dependencies with `yarn install --frozen-lockfile`, sets the package version from the tag, runs `yarn rollup`, and publishes the contents of `build/` to npm.

Both workflows run on Node 20 and rely on repository secrets for authentication.

## Contributing

There is no dedicated contributing guide yet. A typical flow:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and run `yarn format`.
4. Commit and push your branch.
5. Open a Pull Request.

Note that pushes to the `dev` branch trigger automatic version bumping, so `dev` is the integration branch for releases.

## License

No license file is currently present in this repository, and `package.json` does not declare a `license` field. Until one is added, usage terms are unspecified — if you maintain this project, consider adding a `LICENSE` file and a matching `license` field to clarify how the code may be used.
