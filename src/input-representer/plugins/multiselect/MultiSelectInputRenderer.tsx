import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { MultiSelectInputProps, InputConfig } from "../../types";
import MultipleSelectionInput from "../../../components/atoms/inputs/normal/multiple-selection/MultipleSelection";

/**
 * Renderer for multiselect inputs
 */
export class MultiSelectInputRenderer extends BaseRenderer<
  (string | number)[],
  MultiSelectInputProps
> {
  render(props: MultiSelectInputProps): React.ReactNode {
    return (
      <MultipleSelectionInput
        label={props.title}
        description={props.description}
        inputContainerClassName={props.className}
        value={props.value}
        options={props.options}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
      />
    );
  }

  protected extendProps(
    baseProps: MultiSelectInputProps,
    config: InputConfig
  ): MultiSelectInputProps {
    return {
      ...baseProps,
      options: "enum" in config ? config.enum : undefined,
    };
  }
}
