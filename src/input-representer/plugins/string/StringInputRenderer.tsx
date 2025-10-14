import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { StringInputProps, InputConfig } from "../../types";
import StringInput from "../../../components/atoms/inputs/normal/string/String";

/**
 * Renderer for string inputs
 */
export class StringInputRenderer extends BaseRenderer<string, StringInputProps> {
  render(props: StringInputProps): React.ReactNode {
    return (
      <StringInput
        label={props.title}
        description={props.description}
        inputContainerClassName={props.className}
        value={props.value}
        options={props.options}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value });
        }}
      />
    );
  }

  protected extendProps(baseProps: StringInputProps, config: InputConfig): StringInputProps {
    return {
      ...baseProps,
      options: "enum" in config ? (config.enum as string[]) : undefined,
      size: "size" in config ? config.size : undefined,
      icon: "icon" in config ? config.icon : undefined,
      placeholder: "placeholder" in config ? config.placeholder : undefined,
    };
  }
}
