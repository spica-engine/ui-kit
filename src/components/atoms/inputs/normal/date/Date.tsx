import React, { memo } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Icon from "components/atoms/icon/Icon";
import styles from "./Date.module.scss";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";

type DateRangePickerProps = {
  onChange: DatePickerProps["onChange"];
  value?: dayjs.Dayjs;
  placeholder?: string;
};

const DatePickerInput: React.FC<DateRangePickerProps> = ({ onChange, value, placeholder }) => (
  <FluidContainer
    className={styles.datePickerContainer}
    alignment={"leftCenter"}
    dimensionX={"fill"}
    prefix={{ children: <Icon name="calendarBlank" /> }}
    root={{
      children: (
        <DatePicker
          onChange={onChange}
          value={value ? dayjs(value) : null}
          className={styles.datePicker}
          suffixIcon={null}
          placeholder={placeholder}
        />
      ),
    }}
  />
);

export default memo(DatePickerInput);
