# ColorPicker Component

A polished, dependency-free ColorPicker React component built with TypeScript that provides a modern color selection interface.

## Features

- **Multiple Format Support**: HEX, RGB, and HSL color formats
- **Interactive Controls**:
  - Saturation/Value panel with draggable handle
  - Hue slider with full rainbow gradient
  - Alpha slider with checkerboard background
- **Real-time Updates**: Live preview and floating label
- **Accessibility**: Full keyboard navigation, ARIA attributes, screen reader support
- **Mobile Support**: Touch-friendly drag interactions
- **No Dependencies**: Pure React implementation with custom color math

## Installation

The ColorPicker component is included in the UI kit. Import it from the main package:

```tsx
import { ColorPicker, ColorValue, ColorFormat } from "your-ui-kit";
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { ColorPicker, ColorValue } from "your-ui-kit";

const MyComponent = () => {
  const [color, setColor] = useState<ColorValue>();

  return <ColorPicker defaultValue="#1677FF" onChange={setColor} />;
};
```

## API Reference

### Props

| Prop           | Type                          | Default          | Description                               |
| -------------- | ----------------------------- | ---------------- | ----------------------------------------- |
| `value`        | `string`                      | -                | Controlled color value (HEX, RGB, or HSL) |
| `defaultValue` | `string`                      | `"#1677FF"`      | Initial color value                       |
| `onChange`     | `(color: ColorValue) => void` | -                | Callback fired when color changes         |
| `format`       | `ColorFormat`                 | `"hex"`          | Initial format for input display          |
| `placement`    | `string`                      | `"bottom-start"` | Popover placement                         |
| `disabled`     | `boolean`                     | `false`          | Disables the color picker                 |
| `id`           | `string`                      | -                | HTML id attribute                         |
| `className`    | `string`                      | -                | Additional CSS class                      |

### Types

```tsx
type ColorFormat = "hex" | "rgb" | "hsl";

interface ColorValue {
  hex: string; // #RRGGBB or #RRGGBBAA
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
}

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: ColorValue) => void;
  format?: ColorFormat;
  placement?: "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";
  disabled?: boolean;
  id?: string;
  className?: string;
}
```

## Examples

### Controlled Component

```tsx
const [color, setColor] = useState("#FF5722");

<ColorPicker value={color} onChange={(colorValue) => setColor(colorValue.hex)} />;
```

### Different Formats

```tsx
// HEX format
<ColorPicker format="hex" defaultValue="#1677FF" />

// RGB format
<ColorPicker format="rgb" defaultValue="rgba(22, 119, 255, 0.8)" />

// HSL format
<ColorPicker format="hsl" defaultValue="hsla(220, 100%, 54%, 1)" />
```

### Custom Placement

```tsx
<ColorPicker placement="top" defaultValue="#4CAF50" />
<ColorPicker placement="bottom-end" defaultValue="#FF9800" />
```

## Keyboard Navigation

- **Tab**: Navigate between controls
- **Enter/Space**: Open/close popover on trigger
- **Escape**: Close popover
- **Arrow Keys**: Move handles in SV panel and sliders
- **Shift + Arrow Keys**: Move handles with larger steps

## Accessibility Features

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Support**: Full keyboard navigation
- **Focus Management**: Proper focus trapping and restoration
- **Screen Reader**: Compatible with screen readers
- **High Contrast**: Visible focus indicators

## Color Math

The component includes comprehensive color conversion utilities:

- HEX ⟷ RGB ⟷ HSL conversions
- HSV color space for SV panel calculations
- Alpha channel support
- Input parsing for multiple formats

## Styling

The component uses CSS Modules with CSS custom properties for theming. Key CSS classes:

- `.colorPicker` - Main container
- `.trigger` - Trigger button
- `.popover` - Color picker popover
- `.svPanel` - Saturation/Value panel
- `.slider` - Hue and alpha sliders
- `.controls` - Input controls row

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Touch events for mobile devices

## Performance

- RAF-throttled drag updates for smooth interactions
- Memoized calculations to prevent unnecessary re-renders
- Efficient event handling with proper cleanup
