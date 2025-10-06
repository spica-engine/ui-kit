export type ColorFormat = "hex" | "rgb" | "hsl";

export interface ColorValue {
  hex: string; // #RRGGBB (uppercase), includes alpha as #RRGGBBAA when alpha < 1
  rgb: { r: number; g: number; b: number; a: number }; // 0-255, a: 0-1
  hsl: { h: number; s: number; l: number; a: number }; // h: 0-360, s/l: 0-100
}

export interface ColorPickerProps {
  value?: string; // accepts "#1677FF", "rgba(...)", or "hsl(...)"
  defaultValue?: string;
  onChange?: (color: ColorValue) => void;
  format?: ColorFormat; // initial format for the input select (default 'hex')
  placement?: "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";
  disabled?: boolean;
  id?: string;
  className?: string;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface HSVColor {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}
