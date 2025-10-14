import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { ArrayInputProps, InputConfig, ArrayValue, ValidationError } from "../../types";
import ArrayInput from "../../../components/atoms/inputs/normal/array/ArrayInput";

/**
 * Renderer for array inputs
 */
export class ArrayInputRenderer extends BaseRenderer<ArrayValue, ArrayInputProps> {
  render(props: ArrayInputProps): React.ReactNode {
    return (
      <ArrayInput
        title={props.title}
        description={props.description}
        value={props.value as any}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
        minItems={props.minItems}
        maxItems={props.maxItems}
        items={props.items as any}
        propertyKey={props.key}
        errors={props.errors as any}
      />
    );
  }

  protected extendProps(baseProps: ArrayInputProps, config: InputConfig): ArrayInputProps {
    return {
      ...baseProps,
      minItems: "minItems" in config ? config.minItems : undefined,
      maxItems: "maxItems" in config ? config.maxItems : undefined,
      items: "items" in config ? config.items : undefined,
      errors:
        typeof baseProps.error === "object" ? (baseProps.error as ValidationError) : undefined,
    };
  }
}
