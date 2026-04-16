# Oziko UI Kit — Project Overview

> **Package**: `oziko-ui-kit` &nbsp;|&nbsp; **Version**: 0.0.122 &nbsp;|&nbsp; **Visibility**: Public npm  
> A reusable React component library built with TypeScript following the Atomic Design System pattern.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Component Catalogue](#4-component-catalogue)
   - 4.1 [Atoms — Base Components](#41-atoms--base-components)
   - 4.2 [Molecules — Composite Components](#42-molecules--composite-components)
   - 4.3 [Organisms — Complex Layout Components](#43-organisms--complex-layout-components)
5. [Custom Hooks](#5-custom-hooks)
6. [Theme System](#6-theme-system)
7. [Utility Functions](#7-utility-functions)
8. [Build & Export Pipeline](#8-build--export-pipeline)
9. [Styling Approach](#9-styling-approach)
10. [Folder Structure](#10-folder-structure)

---

## 1. Project Identity

| Property        | Value                                            |
|-----------------|--------------------------------------------------|
| Package name    | `oziko-ui-kit`                                   |
| Version         | `0.0.122`                                        |
| License         | Public npm                                       |
| Entry (CJS)     | `dist/index.cjs.js`                              |
| Entry (ESM)     | `dist/index.mjs`                                 |
| Type definitions| `dist/index.export.d.ts`                         |
| Styles          | `dist/index.css`                                 |
| React version   | 19.x (peer dependency)                           |
| TypeScript      | 5.7.x                                            |

The library standardises UI across applications by exporting a consistent set of components, hooks, a theme engine, and utility functions.

---

## 2. Tech Stack

### Core

| Layer          | Library / Tool                  | Version  |
|-----------------|--------------------------------|----------|
| Framework       | React                          | 19.0.0   |
| Language        | TypeScript                     | 5.7.3    |
| Bundler         | Rollup                         | —        |
| Styling         | SASS (SCSS Modules)            | 1.83.1   |
| CSS-in-JS       | Emotion (`@emotion/react/styled`)| 11.x   |

### UI Libraries

| Library          | Purpose                                     | Version  |
|------------------|---------------------------------------------|----------|
| `@mui/material`  | Base UI primitives (inputs, layout, icons)  | 6.3.1    |
| `antd`           | Supplementary UI components                 | 5.23.1   |
| `lexical`        | Rich text / WYSIWYG editor                  | 0.23.1   |

### Data & Interaction

| Library                        | Purpose                            |
|--------------------------------|------------------------------------|
| `chart.js` + `react-chartjs-2` | Chart rendering                    |
| `chartjs-adapter-date-fns`     | Date-axis support for charts       |
| `chartjs-plugin-annotation`    | Annotation overlays on charts      |
| `chartjs-plugin-zoom`          | Pan/zoom interactions on charts    |
| `leaflet` + `react-leaflet`    | Interactive maps                   |
| `react-grid-layout`            | Drag-and-drop dashboard grids      |
| `react-draggable`              | General draggable elements         |
| `react-resizable`              | Resizable elements                 |
| `react-dropzone`               | File drag-and-drop upload          |
| `react-infinite-scroll-component` | Infinite scroll lists          |

### Forms & Data

| Library    | Purpose                                  |
|------------|------------------------------------------|
| `formik`   | Form state management                    |
| `date-fns` | Date formatting and arithmetic           |
| `lodash`   | General utility (deep clone, equality…)  |

---

## 3. Architecture

The library strictly follows the **Atomic Design System**:

```
Atoms  →  Molecules  →  Organisms
(base)    (composite)   (full sections/layouts)
```

### Key architectural decisions

- **CSS Modules** (`.module.scss`) per component for style isolation.
- **CSS Custom Properties** (CSS variables) injected by the theme engine at runtime, consumed by all components.
- **React Context** for theme propagation — no prop-drilling required.
- **Peer dependencies** (`react`, `react-dom`) are **not bundled** into the output to avoid duplication at the consumer level.
- **Full TypeScript coverage** — every component exports its own `Type*` interface, re-exported from the top-level index.
- **Dual output**: CommonJS (`index.cjs.js`) for Node environments and ESM (`index.mjs`) for tree-shaking in modern bundlers.

---

## 4. Component Catalogue

### 4.1 Atoms — Base Components

Atoms are the smallest building blocks. They have no dependencies on other library components.

#### General UI Atoms

| Component        | Description                                                         |
|------------------|---------------------------------------------------------------------|
| `Autocomplete`   | Text input with suggestion dropdown                                 |
| `Backdrop`       | Overlay layer behind modals/drawers                                 |
| `BaseInput`      | Low-level input primitive (label, group, error state)               |
| `BucketFieldPopup`| Popup for selecting/editing schema bucket fields                   |
| `BucketSchemaItem`| Single item display in a schema bucket list                        |
| `BucketSchemaList`| Renders a list of schema bucket items                              |
| `Button`         | Multi-variant button (`solid`, `outlined`, `dashed`, `filled`, `text`, `link`, `icon`) |
| `Chart`          | Wraps Chart.js — supports pan/zoom, annotations, date adapters      |
| `Checkbox`       | Styled checkbox control                                             |
| `Chip`           | Tag/label chip with optional remove action                          |
| `CircularProgress`| Circular loading/progress indicator                               |
| `Color`          | Displays a colour swatch                                            |
| `ColorPicker`    | Full HSL/hex colour picker control                                  |
| `DashboardItem`  | Resizable/draggable wrapper card for dashboard grids               |
| `DatePicker`     | Date selection control (date-fns powered)                           |
| `Directory`      | File-system directory tree display                                  |
| `DraggableBar`   | Horizontally draggable resize handle bar                            |
| `Drawer`         | Slide-in side panel                                                 |
| `DropList`       | Dropdown list with virtualised/infinite scroll support              |
| `FlexElement`    | Utility wrapper element with flex dimension props                   |
| `FluidContainer` | Responsive fluid container                                          |
| `Icon`           | MUI icon resolver by name (typed `IconName`)                        |
| `Input`          | Standard text input (wraps `BaseInput`)                             |
| `InputHeader`    | Header row for labelled input groups                                |
| `InputWithIcon`  | Input with inline leading/trailing icon                             |
| `Json`           | Read-only collapsible JSON tree renderer                            |
| `ListItem`       | Single list entry row                                               |
| `ListRow`        | Configurable row with actions for data lists                        |
| `Map`            | Leaflet-based interactive map with click handlers and coordinates   |
| `Modal`          | Accessible dialog with composable header/body/footer                |
| `Popover`        | Floating popover anchored to a trigger element                      |
| `Portal`         | Renders children into a DOM portal outside the component tree       |
| `RelationInput`  | Input for selecting related entity references                       |
| `SelectOption`   | Labelled value option item used inside select-style components      |
| `Spinner`        | Indeterminate loading spinner                                       |
| `StorageFileCard`| Card representing a file stored in a storage bucket                |
| `Switch`         | Toggle switch control                                               |
| `Tab`            | Single tab item (used within tab bar containers)                    |
| `Text`           | Typed text renderer with variant/colour/size props                  |
| `Title`          | Specialised heading text with semantic level control                |

#### Normal (Full-Size) Input Atoms

Namespace-prefixed exports: `*Input`

| Export                    | Type          | Description                                          |
|---------------------------|---------------|------------------------------------------------------|
| `ArrayInput`              | `array`       | Dynamic list of same-type items                      |
| `BooleanInput`            | `boolean`     | Checkbox or toggle for boolean values                |
| `ChipInput`               | `chip`        | Free-form tag entry (molecule, but in inputs group)  |
| `ColorInput`              | `color`       | Colour picker form field                             |
| `DateInput`               | `date`        | Date/time form field                                 |
| `EnumInput`               | `enum`        | Dropdown for fixed enumeration values                |
| `LocationInput`           | `location`    | Geographic coordinate input (lat/lng)                |
| `MultipleSelectionInput`  | `multi-select`| Multi-select checkbox group                          |
| `NumberInput`             | `number`      | Numeric input with optional min/max/step             |
| `ObjectInput`             | `object`      | Recursive object field editor                        |
| `RichTextInput`           | `rich-text`   | Lexical-based WYSIWYG editor                         |
| `StorageInput`            | `storage`     | File upload / storage bucket selector                |
| `StringInput`             | `string`      | Plain string input field                             |
| `TextAreaInput`           | `text-area`   | Multi-line text input                                |

#### Minimized (Compact) Input Atoms

Compact inline variants for data-dense UIs: `*MinimizedInput`

| Export                          | Type            |
|---------------------------------|-----------------|
| `ArrayMinimizedInput`           | array           |
| `BooleanMinimizedInput`         | boolean         |
| `ColorMinimizedInput`           | color           |
| `DateMinimizedInput`            | date            |
| `LocationMinimizedInput`        | location        |
| `MultipleSelectionMinimizedInput` | multi-select  |
| `NumberMinimizedInput`          | number          |
| `ObjectMinimizedInput`          | object          |
| `RichTextMinimizedInput`        | rich-text       |
| `StorageMinimizedInput`         | storage         |
| `StringMinimizedInput`          | string          |
| `TextAreaMinimizedInput`        | text-area       |

---

### 4.2 Molecules — Composite Components

Molecules are built from atom combinations and encapsulate richer interaction patterns.

| Component       | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| `Select`        | Feature-rich dropdown — single/multi select, search, async loading, virtualisation |
| `Accordion`     | Collapsible section panels with optional grouping                                  |
| `ChipInput`     | Free-form tag creation — type and press Enter to add chips                         |
| `NavigatorItem` | Navigation menu item with icon, label, active state, and nesting                  |
| `SsoButton`     | Pre-styled single sign-on provider button (Google, etc.)                           |
| `StorageFilter` | Multi-criteria filter bar for storage/file browsers                                |
| `Timeline`      | Horizontal bar-chart timeline for displaying time-ranged data                      |

---

### 4.3 Organisms — Complex Layout Components

Organisms compose multiple molecules/atoms into complete UI sections.

| Component              | Description                                                                          |
|------------------------|--------------------------------------------------------------------------------------|
| `Dashboard`            | Drag-and-drop grid layout powered by `react-grid-layout`; composed of `DashboardItem` tiles |
| `Table`                | Full-featured data table — sortable columns, cell editors, column resize, local-storage persistence |
| `MenuGroup`            | Grouped navigation sidebar section wrapping multiple `NavigatorItem`s               |
| `Section`              | Generic page section with header, content area, and action slot                     |
| `NotificationProvider` | Toast notification system — wrap app in provider, consume via `useNotification` hook |

---

## 5. Custom Hooks

All hooks are exported from `src/custom-hooks/` and available at the library's public API.

| Hook                  | Exported | Description                                                                     |
|-----------------------|----------|---------------------------------------------------------------------------------|
| `useInputRepresenter` | ✅        | Determines the correct input component and props for a given data type at runtime |
| `useKeyDown`          | ✅        | Attaches keyboard event listeners with clean-up, maps key names to callbacks    |
| `useOnClickOutside`   | ✅        | Detects clicks outside a referenced element; used for dropdowns/menus           |
| `useAdaptivePosition` | ✅        | Calculates smart placement (top/bottom/left/right) for floating UI elements to stay within viewport |
| `useFlexStyles`       | ❌ (internal) | Resolves `width`/`height`/`flex` CSS values from shorthand dimension props  |
| `useArrayItemInput`   | ❌ (internal) | Manages add/remove/update state for dynamic item arrays in form inputs      |
| `useDebounce`         | ❌ (internal) | Returns a debounced version of any value, configurable delay                |
| `useFileView`         | ❌ (internal) | Handles file preview logic (URL object lifecycle, MIME type detection)      |

---

## 6. Theme System

The theme engine is the backbone of consistent visual styling. It is fully runtime-configurable without rebuilding the library.

### Overview

```
createTheme(overrides)
    │
    ▼
ThemeContext (React Context)
    │
    ├─ injects CSS custom properties on <html> / :root
    │
    └─ provides useTheme() hook to consumers
```

### TypeTheme Shape

```typescript
type TypeTheme = {
  palette: {
    // Brand colours
    primary: string;      primaryLight: string;  primaryDark: string;
    danger: string;       dangerLight: string;   dangerDark: string;
    success: string;      successLight: string;  successDark: string;
    soft: string;         softLight: string;     softDark: string;

    // Surfaces & chrome
    background: string;   menuBackground: string;
    zebra: string;        border: string;        boxShadow: string;

    // Typography & inputs
    fontPrimary: string;  fontSecondary: string;
    inputBackground: string; inputPlaceholder: string;

    tonalOffset: number | { light: number; dark: number };
    mode?: 'dark' | 'light';
  };
  padding:      { base, xs, sm, md, lg, xl };   // pixel values
  gap:          { base, xs, sm, md, lg, xl };
  borderRadius: { base, sm, md, lg };
  fontSize:     number;
  fontFamily:   string;
};
```

### Auto-generated Colour Variants

`createTheme` automatically derives `*Light` and `*Dark` palette variants from each base colour using HSL manipulation:

- Converts base hex → HSL
- Applies `tonalOffset` to Lightness channel
- Converts back to hex

This means consumers only need to provide the three brand base colours.

### CSS Custom Properties Injected

```css
--color-primary          --color-primary-rgb
--color-danger           --color-danger-rgb
--color-success          --color-success-rgb
--color-background
--border-radius-sm       --border-radius-md       --border-radius-lg
--padding-xs             --padding-sm             --padding-md  ...
--gap-xs                 --gap-sm                 --gap-md      ...
--oziko-font-size-base
--oziko-font-family-base
```

### Persistence

| Function      | Description                                              |
|---------------|----------------------------------------------------------|
| `loadTheme()` | Reads a saved theme from `localStorage`                  |
| `saveTheme()` | Serialises and writes current theme to `localStorage`    |

### Usage

```tsx
import { createTheme, useTheme } from 'oziko-ui-kit';

const theme = createTheme({
  palette: { primary: '#6366F1', mode: 'dark' }
});

// Wrap app:
<ThemeProvider theme={theme}>...</ThemeProvider>

// In any component:
const { theme } = useTheme();
```

---

## 7. Utility Functions

All utilities are exported under namespaced sub-paths from `src/utils/`.

### `api`

| Export         | Type       | Description                                    |
|----------------|------------|------------------------------------------------|
| `TypeLocation` | type       | GeoJSON-like `{ lat: number; lng: number }`    |
| `isTypeLocation` | function | Type guard for `TypeLocation`                  |

### `time`

| Export              | Description                                              |
|---------------------|----------------------------------------------------------|
| `timeUnitsInSeconds`| Lookup map: `second → 1`, `minute → 60`, `hour → 3600`… |
| `unitMapper()`      | Auto-selects best time unit based on a duration value    |
| `getDiffInMinutes()`| Returns difference between two dates in minutes         |
| `formatDateToEnUs()`| Formats a date to `"MMM d, h:mm a"` (US English)       |

### `color`

| Export       | Description                                    |
|--------------|------------------------------------------------|
| `hexToHSL()` | Converts `#rrggbb` → `{ h, s, l }`             |
| `hexToRgb()` | Converts `#rrggbb` → `{ r, g, b }`             |

### `helperUtils`

| Export         | Description                                             |
|----------------|---------------------------------------------------------|
| `camelToKebab()` | Converts `camelCase` string to `kebab-case`           |
| `deepCopy()`   | Deep clones an object (using `JSON.parse/stringify`)    |

### `iconList`

Exports `IconName` — a string union type of every available MUI icon name, used by the `Icon` atom for type-safe icon rendering.

### `interface`

Shared TypeScript utility types reused across multiple components:

- `TypeFlexDimension` — `width`, `height`, `flex`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`

---

## 8. Build & Export Pipeline

### Tools

| Tool                       | Role                                                     |
|----------------------------|----------------------------------------------------------|
| Rollup                     | Module bundler (config: `rollup.config.js`)              |
| `rollup-plugin-typescript2` | Compiles TypeScript, emits `.d.ts` files               |
| `rollup-plugin-scss`       | Compiles SCSS modules, emits `dist/index.css`            |
| `@rollup/plugin-node-resolve` | Resolves `node_modules` imports                      |
| `@rollup/plugin-commonjs`  | Converts CJS deps to ESM                                 |
| `@rollup/plugin-url`       | Inlines assets < 8 KB as data URLs; emits larger ones    |
| PostCSS                    | Post-processes CSS (prefix selectors, strip charset)     |
| `postcss-prefix-selector`  | Scopes global styles under a namespace selector          |
| `postcss-discard-comments` | Strips CSS comments from output                          |

### Output Artifacts

```
dist/
├── index.cjs.js         ← CommonJS bundle (for Node / older tools)
├── index.mjs            ← ESM bundle (tree-shakeable, modern bundlers)
├── index.css            ← Compiled global + component CSS
├── index.export.d.ts    ← TypeScript declarations for all exports
└── [Leaflet assets]     ← Marker images and tile assets (copied)
```

### Build Script

```bash
yarn rollup
# 1. rollup -c          → runs Rollup with rollup.config.js
# 2. rollup-clean-css   → strips @charset directives from dist/index.css
```

### Peer Dependencies

The following are **not bundled** (consumers must install them):

- `react`, `react-dom`
- `@mui/material`, `@mui/icons-material`
- `@emotion/react`, `@emotion/styled`

### Public API Surface (`src/index.export.ts`)

The entry file explicitly re-exports:

- **35+ component defaults** (atoms, molecules, organisms)
- **4 public hooks**
- **Theme**: `createTheme`, `useTheme`, `loadTheme`, `saveTheme`
- **100+ TypeScript types** (`Type*` interfaces for every component)
- **`IconName`** union type & **`TypeInputType`** enum

---

## 9. Styling Approach

### SCSS Modules

Every component has a co-located `.module.scss` file. Class names are locally scoped at build time, preventing conflicts across components.

```
src/components/atoms/button/
├── Button.tsx
└── Button.module.scss
```

### Global Stylesheet

`src/styles/shared/global.scss` contains:
- CSS resets and baseline typography
- Ant Design and MUI style overrides scoped under the library namespace
- Scrollbar styling
- Leaflet reset

Both `global.scss` and `index.scss` are imported in `src/index.export.ts` and compiled into `dist/index.css`.

### Mixin Library (`src/styles/_mixins.scss`)

Reusable SCSS mixins shared across all component stylesheets:

**Flex layout mixins**

| Mixin                    | CSS output                                          |
|--------------------------|-----------------------------------------------------|
| `flexCenter`             | `display:flex; align-items:center; justify-content:center` |
| `flexCol`                | `flex-direction: column`                            |
| `flexAlignCenter`        | `display:flex; align-items:center`                  |
| `flexJustifyBetween`     | `justify-content: space-between`                    |
| `flexJustifyCenter`      | `justify-content: center`                           |

**Text utilities**

| Mixin              | Description                                                 |
|--------------------|-------------------------------------------------------------|
| `textEllipsis`     | Single-line overflow → `…`                                  |
| `multiLineEllipsis(n)` | Multi-line clamp with `-webkit-line-clamp: n`           |

### CSS Custom Properties (runtime theming)

Components reference theme values through CSS variables rather than hard-coded values:

```scss
// Example usage inside a component .module.scss
.button {
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  padding: var(--padding-sm) var(--padding-md);
  font-size: var(--oziko-font-size-base);
}
```

This means a single `createTheme()` call re-styles the entire application without any re-renders of SCSS.

---

## 10. Folder Structure

```
ui-kit/
│
├── rollup.config.js          ← Rollup bundler configuration
├── tsconfig.json             ← TypeScript compiler options
├── package.json              ← Package metadata, dependencies, scripts
│
├── dist/                     ← Compiled output (published to npm)
│   ├── index.cjs.js
│   ├── index.mjs
│   ├── index.css
│   └── index.export.d.ts
│
├── public/                   ← CRA development public assets
│   ├── index.html
│   └── manifest.json
│
└── src/
    ├── index.export.ts       ← Library public API entry point
    ├── index.tsx             ← CRA dev app entry
    ├── App.tsx               ← CRA dev app root component
    │
    ├── assets/
    │   ├── fonts/inter/      ← Inter font files
    │   └── images/           ← Static image assets
    │
    ├── components/
    │   ├── atoms/            ← 35+ base building-block components
    │   │   ├── button/
    │   │   ├── input/
    │   │   ├── modal/
    │   │   ├── inputs/
    │   │   │   ├── normal/   ← Full-size typed input components (13 types)
    │   │   │   └── minimized/← Compact typed input components (12 types)
    │   │   └── …
    │   │
    │   ├── molecules/        ← 7 composite components
    │   │   ├── select/
    │   │   ├── accordion/
    │   │   ├── timeline/
    │   │   └── …
    │   │
    │   └── organisms/        ← 5 complex layout/section components
    │       ├── dashboard/
    │       ├── table/
    │       ├── notification/
    │       └── …
    │
    ├── custom-hooks/         ← 8 reusable React hooks
    │   ├── useInputRepresenter.tsx
    │   ├── useKeyDown.tsx
    │   ├── useOnClickOutside.tsx
    │   ├── useAdaptivePosition.tsx
    │   ├── useFlexStyles.ts
    │   ├── useArrayItemInput.tsx
    │   ├── useDebounce.ts
    │   └── useFileView.tsx
    │
    ├── styles/
    │   ├── _mixins.scss      ← Shared SCSS mixin library
    │   └── shared/
    │       └── global.scss   ← Global resets & third-party overrides
    │
    ├── theme/
    │   ├── types.ts          ← TypeTheme, TypePalette, TypeSpacing…
    │   ├── createTheme.ts    ← Theme factory with HSL colour generation
    │   ├── defaultPalette.ts ← Default dark & light palettes
    │   ├── ThemeContext.tsx  ← React Context provider + useTheme hook
    │   ├── loadTheme.ts      ← localStorage persistence (read)
    │   └── saveTheme.ts      ← localStorage persistence (write)
    │
    └── utils/
        ├── index.ts          ← Re-exports all utility namespaces
        ├── api.ts            ← TypeLocation & type guards
        ├── time.ts           ← Date formatting & time arithmetic
        ├── color.ts          ← Hex ↔ HSL / RGB conversions
        ├── helperUtils.ts    ← camelToKebab, deepCopy…
        ├── interface.ts      ← Shared TypeScript utility types
        └── iconList.tsx      ← IconName string-union type
```

---

*Generated from source analysis — April 5, 2026.*
