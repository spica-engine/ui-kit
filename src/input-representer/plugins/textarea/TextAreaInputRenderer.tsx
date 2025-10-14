import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { TextAreaInputProps, InputConfig } from "../../types";
import TextAreaInput from "../../../components/atoms/inputs/normal/text-area/TextArea";

/**
 * Renderer for textarea inputs
 */
export class TextAreaInputRenderer extends BaseRenderer<string, TextAreaInputProps> {
  render(props: TextAreaInputProps): React.ReactNode {
    return (
      <TextAreaInput
        title={props.title}
        containerProps={{ className: props.className }}
        value={props.value}
        onChange={(event) => props.onChange?.({ key: props.key, value: event.target.value })}
        icon={props.icon ?? "formatSize"}
        placeholder={props.placeholder}
      />
    );
  }

  protected extendProps(baseProps: TextAreaInputProps, config: InputConfig): TextAreaInputProps {
    return {
      ...baseProps,
      icon: "icon" in config ? config.icon : "formatSize",
      placeholder: "placeholder" in config ? config.placeholder : undefined,
    };
  }
}
