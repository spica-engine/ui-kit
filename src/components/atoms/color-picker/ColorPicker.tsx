import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ColorPickerProps, ColorValue, ColorFormat, HSVColor } from "./ColorPicker.types";
import {
  parseColor,
  colorToHsv,
  hsvToColor,
  hsvToRgb,
  toHex,
  rgbaToString,
  hslaToString,
  clamp,
  hexToRgb,
  parseRgb,
  parseHsl,
  rgbToHsl,
  hslToRgb,
} from "./colorMath";
import { useDrag } from "./useDrag";
import styles from "./ColorPicker.module.scss";
import Select from "@molecules/select/Select";
import Input from "@atoms/input/Input";
import { Button, FlexElement, Popover } from "index.export";

const formatColor = (color: ColorValue, format: ColorFormat): string => {
  switch (format) {
    case "hex":
      return color.hex;
    case "rgb":
      return rgbaToString(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a);
    case "hsl":
      return hslaToString(color.hsl.h, color.hsl.s, color.hsl.l, color.hsl.a);
    default:
      return color.hex;
  }
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = "#1677FF",
  onChange,
  format: initialFormat = "hex",
  placement = "bottomStart",
  disabled = false,
  id,
  triggerDisplay = "complete",
  containerProps,
  contentProps,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<ColorFormat>(initialFormat);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [alphaValue, setAlphaValue] = useState("100");

  const initialColor = useMemo(() => {
    const colorString = value ?? defaultValue;
    return parseColor(colorString);
  }, [value, defaultValue]);

  const [color, setColor] = useState<ColorValue>(initialColor);
  const [hsv, setHsv] = useState<HSVColor>(() => colorToHsv(initialColor));

  const triggerRef = useRef<HTMLButtonElement>(null);
  const svPanelRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const alphaSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      const newColor = parseColor(value);
      setColor(newColor);
      setHsv(colorToHsv(newColor));
    }
  }, [value]);

  useEffect(() => {
    setInputValue(formatColor(color, currentFormat));
    setAlphaValue(Math.round(color.rgb.a * 100).toString());
  }, [color, currentFormat]);

  const handleColorChange = useCallback(
    (newColor: ColorValue) => {
      setColor(newColor);
      setHsv(colorToHsv(newColor));
      onChange?.(newColor);
    },
    [onChange]
  );

  const svDrag = useDrag({
    onDrag: (x, y) => {
      const newHsv: HSVColor = {
        ...hsv,
        s: x * 100,
        v: (1 - y) * 100,
      };
      setHsv(newHsv);
      handleColorChange(hsvToColor(newHsv));
    },
    onKeyDown: (event) => {
      const step = event.shiftKey ? 10 : 1;
      let newS = hsv.s;
      let newV = hsv.v;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          newS = clamp(hsv.s - step, 0, 100);
          break;
        case "ArrowRight":
          event.preventDefault();
          newS = clamp(hsv.s + step, 0, 100);
          break;
        case "ArrowUp":
          event.preventDefault();
          newV = clamp(hsv.v + step, 0, 100);
          break;
        case "ArrowDown":
          event.preventDefault();
          newV = clamp(hsv.v - step, 0, 100);
          break;
      }

      if (newS !== hsv.s || newV !== hsv.v) {
        const newHsv: HSVColor = { ...hsv, s: newS, v: newV };
        setHsv(newHsv);
        handleColorChange(hsvToColor(newHsv));
      }
    },
  });

  const hueDrag = useDrag({
    onDrag: (x) => {
      const newHsv: HSVColor = {
        ...hsv,
        h: x * 360,
      };
      setHsv(newHsv);
      handleColorChange(hsvToColor(newHsv));
    },
    onKeyDown: (event) => {
      const step = event.shiftKey ? 10 : 1;
      let newH = hsv.h;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          newH = (hsv.h - step + 360) % 360;
          break;
        case "ArrowRight":
          event.preventDefault();
          newH = (hsv.h + step) % 360;
          break;
      }

      if (newH !== hsv.h) {
        const newHsv: HSVColor = { ...hsv, h: newH };
        setHsv(newHsv);
        handleColorChange(hsvToColor(newHsv));
      }
    },
  });

  const alphaDrag = useDrag({
    onDrag: (x) => {
      const newHsv: HSVColor = {
        ...hsv,
        a: x,
      };
      setHsv(newHsv);
      handleColorChange(hsvToColor(newHsv));
    },
    onKeyDown: (event) => {
      const step = event.shiftKey ? 0.1 : 0.01;
      let newA = hsv.a;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          newA = clamp(hsv.a - step, 0, 1);
          break;
        case "ArrowRight":
          event.preventDefault();
          newA = clamp(hsv.a + step, 0, 1);
          break;
      }

      if (newA !== hsv.a) {
        const newHsv: HSVColor = { ...hsv, a: newA };
        setHsv(newHsv);
        handleColorChange(hsvToColor(newHsv));
      }
    },
  });

  const tryParseColor = (input: string): ColorValue | null => {
    const normalizedInput = input.trim().toLowerCase();

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
      return null;
    }

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
      return null;
    }

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
      return null;
    }

    return null;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim()) {
      const newColor = tryParseColor(value);
      if (newColor) {
        setColor(newColor);
        setHsv(colorToHsv(newColor));
        onChange?.(newColor);
        setInputError(false);
      } else {
        setInputError(true);
      }
    } else {
      setInputError(false);
    }
  };

  const handleInputBlur = () => {
    if (inputError || !inputValue.trim()) {
      setInputValue(formatColor(color, currentFormat));
      setInputError(false);
    } else {
      try {
        const newColor = parseColor(inputValue);
        handleColorChange(newColor);
        setInputError(false);
      } catch {
        setInputError(true);
        setInputValue(formatColor(color, currentFormat));
      }
    }
  };

  const handleAlphaInputChange = (value: string) => {
    setAlphaValue(value);
    const numValue = Number.parseFloat(value);
    if (!Number.isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      const newHsv: HSVColor = { ...hsv, a: numValue / 100 };
      setHsv(newHsv);
      handleColorChange(hsvToColor(newHsv));
    }
  };

  const svPanelStyle = useMemo(() => {
    const hueColor = hsvToRgb(hsv.h, 100, 100);
    return {
      backgroundColor: `rgb(${hueColor.r}, ${hueColor.g}, ${hueColor.b})`,
    };
  }, [hsv.h]);

  const svHandleStyle = useMemo(() => {
    return {
      left: `${hsv.s}%`,
      top: `${100 - hsv.v}%`,
    };
  }, [hsv.s, hsv.v]);

  const hueHandleStyle = useMemo(() => {
    return {
      left: `${(hsv.h / 360) * 100}%`,
    };
  }, [hsv.h]);

  const alphaGradientStyle = useMemo(() => {
    const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    return {
      background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1))`,
    };
  }, [hsv.h, hsv.s, hsv.v]);

  const alphaHandleStyle = useMemo(() => {
    return {
      left: `${hsv.a * 100}%`,
    };
  }, [hsv.a]);

  const swatchStyle = useMemo(() => {
    return {
      backgroundColor: toHex(color.rgb),
    };
  }, [color.rgb]);

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTriggerClick();
    } else if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const getDisplayValue = () => {
    if (currentFormat === "hex") {
      return color.hex;
    }
    return inputValue;
  };

  const displayValue = getDisplayValue();
  const showSwatch = triggerDisplay !== "only-code";
  const showCode = triggerDisplay !== "only-color";

  return (
    <Popover
      content={
        <FlexElement gap={5} direction="vertical">
          <div
            ref={(el) => {
              svPanelRef.current = el;
              if (svDrag.elementRef && el) {
                (svDrag.elementRef as { current: HTMLDivElement | null }).current = el;
              }
            }}
            className={styles.svPanel}
            style={svPanelStyle}
            tabIndex={0}
            role="application"
            aria-label="Saturation and brightness color picker"
          >
            <div className={styles.svBackground} />
            <div className={styles.svHandle} style={svHandleStyle} />
          </div>

          <div className={styles.slidersContainer}>
            <div className={styles.sliders}>
              <div
                ref={(el) => {
                  hueSliderRef.current = el;
                  if (hueDrag.elementRef && el) {
                    (hueDrag.elementRef as { current: HTMLDivElement | null }).current = el;
                  }
                }}
                className={`${styles.slider} ${styles.hueSlider}`}
                tabIndex={0}
                role="slider"
                aria-label="Hue"
                aria-valuenow={Math.round(hsv.h)}
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuetext={`Hue ${Math.round(hsv.h)} degrees`}
              >
                <div className={styles.sliderHandle} style={hueHandleStyle} />
              </div>

              <div
                ref={(el) => {
                  alphaSliderRef.current = el;
                  if (alphaDrag.elementRef && el) {
                    (alphaDrag.elementRef as { current: HTMLDivElement | null }).current = el;
                  }
                }}
                className={`${styles.slider} ${styles.alphaSlider}`}
                tabIndex={0}
                role="slider"
                aria-label="Alpha"
                aria-valuenow={Math.round(hsv.a * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`Alpha ${Math.round(hsv.a * 100)}%`}
              >
                <div className={styles.alphaGradient} style={alphaGradientStyle} />
                <div className={styles.sliderHandle} style={alphaHandleStyle} />
              </div>
            </div>

            <div className={styles.preview}>
              <div className={styles.previewColor} style={swatchStyle} />
            </div>
          </div>

          <FlexElement gap={5} direction="horizontal">
            <Select
              className={styles.formatSelect}
              value={currentFormat}
              options={[
                { value: "hex", label: "HEX" },
                { value: "rgb", label: "RGB" },
                { value: "hsl", label: "HSL" },
              ]}
              onChange={(value) => setCurrentFormat(value as ColorFormat)}
              dimensionY={32}
            />

            <Input
              type="text"
              className={`${styles.colorInput} ${inputError ? styles.error : ""}`}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={handleInputBlur}
              aria-label="Color value"
              aria-invalid={inputError}
              dimensionY={32}
            />

            <FlexElement className={styles.alphaInputContainer}>
              <Input
                type="text"
                className={styles.alphaInput}
                value={alphaValue}
                onChange={(e) => handleAlphaInputChange(e.target.value)}
                aria-label="Alpha percentage"
                dimensionY={32}
                dimensionX={30}
              />
              <span>%</span>
            </FlexElement>
          </FlexElement>
        </FlexElement>
      }
      open={isOpen}
      onClose={() => setIsOpen(false)}
      arrow={true}
      placement="bottom"
      containerProps={{ alignment: "leftCenter", ...containerProps }}
      contentProps={contentProps}
    >
      <Button
        variant="text"
        className={styles.trigger}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        aria-label="Open color picker"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        id={id}
        data-display={triggerDisplay}
        fullWidth={true}
        containerProps={{ dimensionX: "fill" }}
      >
        {showSwatch && (
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={swatchStyle} />
          </div>
        )}
        {showCode && <span className={styles.triggerLabel}>{displayValue}</span>}
      </Button>
    </Popover>
  );
};

export default ColorPicker;
