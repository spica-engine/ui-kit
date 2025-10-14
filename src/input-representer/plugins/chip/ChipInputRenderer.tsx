import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { ChipInputProps, InputConfig } from "../../types";
import ChipInput from "../../../components/molecules/chip/ChipInput";

/**
 * Renderer for chip inputs
 */
export class ChipInputRenderer extends BaseRenderer<string[] | number[], ChipInputProps> {
  render(props: ChipInputProps): React.ReactNode {
    return (
      <ChipInput
        value={props.value ?? []}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value });
        }}
        valueType={props.valueType}
        className={props.className}
      />
    );
  }

  protected extendProps(baseProps: ChipInputProps, config: InputConfig): ChipInputProps {
    return {
      ...baseProps,
      valueType: "valueType" in config ? config.valueType : undefined,
    };
  }
}
