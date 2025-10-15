import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { NumberInputProps, InputConfig } from "../../types";
import NumberInput from "../../../components/atoms/inputs/normal/number/Number";

/**
 * Renderer for number inputs
 */
export class NumberInputRenderer extends BaseRenderer<number, NumberInputProps> {
  render(props: NumberInputProps): React.ReactNode {
    return (
      <NumberInput
        label={props.title}
        description={props.description}
        inputContainerClassName={props.className}
        value={props.value}
        options={props.options}
        onChange={(value) => props.onChange?.({ key: props.key, value: value ?? 0 })}
      />
    );
  }

  protected extendProps(baseProps: NumberInputProps, config: InputConfig): NumberInputProps {
    return {
      ...baseProps,
      options: "enum" in config ? (config.enum as number[]) : undefined,
      min: "min" in config ? (config.min as number | undefined) : undefined,
      max: "max" in config ? (config.max as number | undefined) : undefined,
    };
  }
}
