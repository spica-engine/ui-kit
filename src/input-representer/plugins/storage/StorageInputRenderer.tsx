import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { StorageInputProps, InputConfig } from "../../types";
import StorageInput from "../../../components/atoms/inputs/normal/storage/Storage";

/**
 * Renderer for storage inputs
 */
export class StorageInputRenderer extends BaseRenderer<string, StorageInputProps> {
  render(props: StorageInputProps): React.ReactNode {
    return (
      <StorageInput
        onUpload={props.onUpload || (() => {})}
        label={props.title}
        containerProps={{
          className: props.className,
        }}
      />
    );
  }

  protected extendProps(baseProps: StorageInputProps, config: InputConfig): StorageInputProps {
    return {
      ...baseProps,
      onUpload: undefined, // This should be provided by parent component
    };
  }
}
