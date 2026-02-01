export namespace utils {
  export namespace api {
    export type TypeLocation = { type: string; coordinates: [number, number] };

    export const isTypeLocation = (obj: any): obj is TypeLocation => {
      return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        Array.isArray(obj.coordinates) &&
        obj.coordinates.length === 2 &&
        obj.coordinates.every((coord: unknown) => typeof coord === "number")
      );
    };
  }
  export namespace time {
    export const timeUnitsInSeconds: { [key: string]: number } = {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2592000,
      quarter: 7776000,
      year: 31536000,
    };

    export const unitMapper = (minuteDiff: number) => {
      if (minuteDiff <= 10) return "second";
      // 10min-2h
      if (minuteDiff <= 120) return "minute";
      // 2h-36h
      if (minuteDiff <= 2160) return "hour";
      // 36h-36d
      if (minuteDiff <= 43200) return "day";
      // 36d-36w
      if (minuteDiff <= 50400) return "week";
      // 36w-30m
      if (minuteDiff <= 43200 * 30) return "month";
      // 30m-18y
      if (minuteDiff <= 43200 * 12 * 18) return "quarter";
      // 18y+
      return "year";
    };

    export const getDiffInMinutes = (date1: Date, date2: Date) => {
      const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
      const diffInMinutes = diffInMilliseconds / (1000 * 60);
      return diffInMinutes;
    };

    export const formatDateToEnUs = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    };
  }
  export namespace color {
    export const hexToHSL = (hex: string) => {
      let r = 0,
        g = 0,
        b = 0;

      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      } else {
        throw new Error("Invalid HEX format");
      }

      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return { h, s, l };
    };

    export const hslToHex = (h: number, s: number, l: number) => {
      const hueToRGB = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRGB(p, q, h + 1 / 3);
        g = hueToRGB(p, q, h);
        b = hueToRGB(p, q, h - 1 / 3);
      }
      return `#${Math.round(r * 255)
        .toString(16)
        .padStart(2, "0")}${Math.round(g * 255)
        .toString(16)
        .padStart(2, "0")}${Math.round(b * 255)
        .toString(16)
        .padStart(2, "0")}`;
    };
    export const hexToRgb = (hex: string) => {
      let r = 0,
        g = 0,
        b = 0;
      if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
      return `${r}, ${g}, ${b}`;
    };
  }
}
