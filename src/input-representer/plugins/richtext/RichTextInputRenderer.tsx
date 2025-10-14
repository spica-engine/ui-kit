import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { RichTextInputProps, InputConfig } from "../../types";
import RichTextInput from "../../../components/atoms/inputs/normal/rich-text/RichText";

/**
 * Renderer for richtext inputs
 */
export class RichTextInputRenderer extends BaseRenderer<string, RichTextInputProps> {
  render(props: RichTextInputProps): React.ReactNode {
    return (
      <RichTextInput
        headerProps={{ label: props.title, icon: "formatAlignCenter" }}
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
      />
    );
  }
}
