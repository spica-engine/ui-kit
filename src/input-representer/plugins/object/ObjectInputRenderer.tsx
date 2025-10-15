import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { ObjectInputProps, InputConfig, ObjectValue, ValidationError } from "../../types";
import ObjectInput from "../../../components/atoms/inputs/normal/object/ObjectInput";

/**
 * Renderer for object inputs
 */
export class ObjectInputRenderer extends BaseRenderer<ObjectValue, ObjectInputProps> {
  render(props: ObjectInputProps): React.ReactNode {
    return (
      <ObjectInput
        properties={props.properties as any}
        title={props.title}
        description={props.description}
        value={props.value as any}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value });
        }}
        errors={props.errors as any}
        className={props.className}
      />
    );
  }

  protected extendProps(baseProps: ObjectInputProps, config: InputConfig): ObjectInputProps {
    return {
      ...baseProps,
      properties: "properties" in config ? config.properties! : {},
      errors:
        typeof baseProps.error === "object" ? (baseProps.error as ValidationError) : undefined,
    };
  }
}
