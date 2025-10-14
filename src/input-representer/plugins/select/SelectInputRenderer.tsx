import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { SelectInputProps, InputConfig } from "../../types";
import { Select } from "../../../index.export";

/**
 * Renderer for select inputs
 */
export class SelectInputRenderer extends BaseRenderer<string, SelectInputProps> {
  render(props: SelectInputProps): React.ReactNode {
    return (
      <Select
        options={props.options as string[]}
        value={props.value}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value: value as string });
        }}
      />
    );
  }

  protected extendProps(baseProps: SelectInputProps, config: InputConfig): SelectInputProps {
    return {
      ...baseProps,
      options: "enum" in config ? (config.enum as string[]) : undefined,
    };
  }
}
