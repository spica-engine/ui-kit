import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { DateInputProps, InputConfig } from "../../types";
import DateInput from "../../../components/atoms/inputs/normal/date/Date";

/**
 * Renderer for date inputs
 */
export class DateInputRenderer extends BaseRenderer<Date | string | null, DateInputProps> {
  render(props: DateInputProps): React.ReactNode {
    return (
      <DateInput
        label={props.title}
        description={props.description}
        inputContainerClassName={props.className}
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
      />
    );
  }
}
