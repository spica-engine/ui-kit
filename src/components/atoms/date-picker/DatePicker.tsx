import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import type { DatePickerProps as AntDatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./DatePicker.module.scss";

export type AntDatePickerSharedProps = Omit<AntDatePickerProps, "value" | "onChange">;

type DatePickerProps = {
  onChange?: (value: string | string[]) => void;
  value: Date | string | null | undefined;
} & AntDatePickerSharedProps;

const DatePicker = ({ value, onChange, ...props }: DatePickerProps) => {
  const handleOnChange = (date: Dayjs, dateString: string | string[]) => {
    onChange?.(dateString);
  };

  const parsedValue = dayjs(value);
  const normalizedPickerValue = parsedValue.isValid() ? parsedValue : null;

  return (
    <AntDatePicker
      {...props}
      value={normalizedPickerValue}
      onChange={handleOnChange}
      className={`${styles.datePicker} ${props.className}`}
    />
  );
};

export default DatePicker;
