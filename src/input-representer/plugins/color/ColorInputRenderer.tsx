import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { ColorInputProps, InputConfig } from "../../types";
import ColorInput from "../../../components/atoms/inputs/normal/color/Color";

/**
 * Renderer for color inputs
 */
export class ColorInputRenderer extends BaseRenderer<string, ColorInputProps> {
  render(props: ColorInputProps): React.ReactNode {
    return (
      <ColorInput
        label={props.title}
        description={props.description}
        inputContainerClassName={props.className}
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
      />
    );
  }
}
