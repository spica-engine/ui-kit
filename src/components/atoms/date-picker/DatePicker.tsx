import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import type { DatePickerProps as AntDatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./DatePicker.module.scss";

type DatePickerProps = {
  onChange?: (value: string | string[]) => void;
  value: Date | string | null | undefined;
} & Omit<AntDatePickerProps, "value" | "onChange">;

const DatePicker = ({ value, onChange, ...props }: DatePickerProps) => {
  const handleOnChange = (date: Dayjs, dateString: string | string[]) => {
    onChange?.(dateString);
  };

  return (
    <AntDatePicker
      {...props}
      value={value ? dayjs(value) : null}
      onChange={handleOnChange}
      className={`${styles.datePicker} ${props.className}`}
    />
  );
};

export default DatePicker;
