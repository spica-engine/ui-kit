import { ColorValue, HSVColor } from "./ColorPicker.types";

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round a number to specified precision
 */
export const round = (value: number, precision: number = 0): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

/**
 * Convert RGB to HSL
 */
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  const l = sum / 2;

  if (diff === 0) {
    return { h: 0, s: 0, l: round(l * 100, 1) };
  }

  const s = l > 0.5 ? diff / (2 - sum) : diff / sum;

  let h: number;
  switch (max) {
    case r:
      h = (g - b) / diff + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / diff + 2;
      break;
    case b:
      h = (r - g) / diff + 4;
      break;
    default:
      h = 0;
  }

  return {
    h: round(h * 60, 1),
    s: round(s * 100, 1),
    l: round(l * 100, 1),
  };
};

/**
 * Convert HSL to RGB
 */
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  if (s === 0) {
    const value = Math.round(l * 255);
    return { r: value, g: value, b: value };
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
};

/**
 * Convert RGB to HSV
 */
export const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  const v = max;
  const s = max === 0 ? 0 : diff / max;

  let h: number;
  if (diff === 0) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: round(h * 360, 1),
    s: round(s * 100, 1),
    v: round(v * 100, 1),
  };
};

/**
 * Convert HSV to RGB
 */
export const hsvToRgb = (h: number, s: number, v: number): { r: number; g: number; b: number } => {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = v - c;

  let r: number, g: number, b: number;

  if (h < 1 / 6) {
    [r, g, b] = [c, x, 0];
  } else if (h < 2 / 6) {
    [r, g, b] = [x, c, 0];
  } else if (h < 3 / 6) {
    [r, g, b] = [0, c, x];
  } else if (h < 4 / 6) {
    [r, g, b] = [0, x, c];
  } else if (h < 5 / 6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

/**
 * Convert RGB to hex string
 */
export const toHex = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }): string => {
  const toHexValue = (n: number): string => {
    const hex = Math.round(clamp(n, 0, 255)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = `#${toHexValue(r)}${toHexValue(g)}${toHexValue(b)}`.toUpperCase();

  if (a < 1) {
    const alphaHex = toHexValue(a * 255);
    return `${hex}${alphaHex}`;
  }

  return hex;
};

/**
 * Parse hex string to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number; a: number } | null => {
  // Remove # if present
  hex = hex.replace("#", "");

  // Expand shorthand hex
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse RGB and optional alpha
  if (hex.length === 6) {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b, a: 1 };
  }

  if (hex.length === 8) {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const a = parseInt(hex.substr(6, 2), 16) / 255;
    return { r, g, b, a };
  }

  return null;
};

/**
 * Convert RGB to string format
 */
export const rgbaToString = (r: number, g: number, b: number, a: number): string => {
  if (a === 1) {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${round(a, 2)})`;
};

/**
 * Convert HSL to string format
 */
export const hslaToString = (h: number, s: number, l: number, a: number): string => {
  if (a === 1) {
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
  }
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${round(a, 2)})`;
};

/**
 * Parse RGB/RGBA string
 */
export const parseRgb = (rgb: string): { r: number; g: number; b: number; a: number } | null => {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (!match) return null;

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
};

/**
 * Parse HSL/HSLA string
 */
export const parseHsl = (hsl: string): { h: number; s: number; l: number; a: number } | null => {
  const match = hsl.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/
  );
  if (!match) return null;

  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
};

/**
 * Parse any color string to ColorValue
 */
export const parseColor = (input: string): ColorValue => {
  const normalizedInput = input.trim().toLowerCase();

  // Try hex first
  if (normalizedInput.startsWith("#")) {
    const rgb = hexToRgb(normalizedInput);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        hex: toHex(rgb),
        rgb,
        hsl: { ...hsl, a: rgb.a },
      };
    }
  }

  // Try RGB/RGBA
  if (normalizedInput.startsWith("rgb")) {
    const rgb = parseRgb(normalizedInput);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        hex: toHex(rgb),
        rgb,
        hsl: { ...hsl, a: rgb.a },
      };
    }
  }

  // Try HSL/HSLA
  if (normalizedInput.startsWith("hsl")) {
    const hsl = parseHsl(normalizedInput);
    if (hsl) {
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      return {
        hex: toHex({ ...rgb, a: hsl.a }),
        rgb: { ...rgb, a: hsl.a },
        hsl,
      };
    }
  }

  // Default fallback
  return {
    hex: "#1677FF",
    rgb: { r: 22, g: 119, b: 255, a: 1 },
    hsl: { h: 220, s: 100, l: 54, a: 1 },
  };
};

/**
 * Convert ColorValue to HSV for SV panel calculations
 */
export const colorToHsv = (color: ColorValue): HSVColor => {
  const hsv = rgbToHsv(color.rgb.r, color.rgb.g, color.rgb.b);
  return { ...hsv, a: color.rgb.a };
};

/**
 * Convert HSV to ColorValue
 */
export const hsvToColor = (hsv: HSVColor): ColorValue => {
  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    hex: toHex({ ...rgb, a: hsv.a }),
    rgb: { ...rgb, a: hsv.a },
    hsl: { ...hsl, a: hsv.a },
  };
};
