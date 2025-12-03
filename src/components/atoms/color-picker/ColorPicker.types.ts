import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { Placement } from "@custom-hooks/useAdaptivePosition";

export type ColorFormat = "hex" | "rgb" | "hsl";

export interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
}

export type ColorPickerTriggerDisplay = "only-color" | "only-code" | "complete";

export interface ColorPickerProps {
  containerProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
  value?: string;
  defaultValue?: string;
  onChange?: (color: ColorValue) => void;
  format?: ColorFormat;
  placement?: Placement;
  id?: string;
  disabled?: boolean;
  triggerDisplay?: ColorPickerTriggerDisplay;
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
  h: number;
  s: number;
  v: number;
  a: number;
}
