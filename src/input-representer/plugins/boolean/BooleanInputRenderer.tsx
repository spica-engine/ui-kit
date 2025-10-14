import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { BooleanInputProps, InputConfig } from "../../types";
import BooleanInput from "../../../components/atoms/inputs/normal/boolean/Boolean";

/**
 * Renderer for boolean inputs
 */
export class BooleanInputRenderer extends BaseRenderer<boolean, BooleanInputProps> {
  render(props: BooleanInputProps): React.ReactNode {
    return (
      <BooleanInput
        checked={props.value}
        label={props.title}
        description={props.description}
        containerProps={{ dimensionX: "fill" }}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
        size={props.size}
      />
    );
  }

  protected extendProps(baseProps: BooleanInputProps, config: InputConfig): BooleanInputProps {
    return {
      ...baseProps,
      size: "size" in config ? config.size : undefined,
    };
  }
}
