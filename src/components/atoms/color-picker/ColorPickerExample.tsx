import React, { useState } from "react";
import { ColorPicker, ColorValue } from "./index";

const ColorPickerExample: React.FC = () => {
  const [color, setColor] = useState<ColorValue>({
    hex: "#1677FF",
    rgb: { r: 22, g: 119, b: 255, a: 1 },
    hsl: { h: 220, s: 100, l: 54, a: 1 },
  });

  const handleColorChange = (newColor: ColorValue) => {
    setColor(newColor);
    console.log("Color changed:", newColor);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>ColorPicker Component Examples</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Basic Usage</h3>
        <ColorPicker defaultValue="#1677FF" onChange={handleColorChange} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>With Controlled Value</h3>
        <ColorPicker value={color.hex} onChange={handleColorChange} format="hex" />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>RGB Format</h3>
        <ColorPicker
          defaultValue="rgba(255, 100, 50, 0.8)"
          format="rgb"
          onChange={(color) => console.log("RGB Color:", color)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>HSL Format</h3>
        <ColorPicker
          defaultValue="hsla(180, 50%, 50%, 0.7)"
          format="hsl"
          onChange={(color) => console.log("HSL Color:", color)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Disabled State</h3>
        <ColorPicker defaultValue="#FF5722" disabled={true} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Different Placements</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <ColorPicker defaultValue="#4CAF50" placement="top-start" />
          <ColorPicker defaultValue="#FF9800" placement="top" />
          <ColorPicker defaultValue="#9C27B0" placement="top-end" />
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Current Color Value</h3>
        <pre style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
          {JSON.stringify(color, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ColorPickerExample;
