import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import type { DatePickerProps as AntDatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./DatePicker.module.scss";

type DatePickerProps = AntDatePickerProps;

const DatePicker = ({ ...props }: DatePickerProps) => {
  return <AntDatePicker {...props} className={`${styles.datePicker} ${props.className}`} />;
};

export default DatePicker;
