import React from "react";
import type { DatePickerProps } from "antd";
import DatePicker from "components/atoms/date-picker/DatePicker";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import dayjs from "dayjs";
import Icon from "components/atoms/icon/Icon";
import styles from "./Date.module.scss";

type DateInputProps = {
  onChange: DatePickerProps["onChange"];
  value?: dayjs.Dayjs;
  placeholder?: string;
  onClear?: () => void;
  datePickerClassName?: string;
} & TypeFluidContainer;

const DateMinimizedInput = ({
  onChange,
  value,
  placeholder = "",
  onClear,
  datePickerClassName,
  ...props
}: DateInputProps) => {
  return (
    <FluidContainer
      mode="fill"
      dimensionX="fill"
      gap={10}
      {...props}
      className={`${styles.minimizedDatePicker} ${props.className}`}
      root={{
        alignment: "leftCenter",
        children: (
          <DatePicker
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            suffixIcon={null}
            allowClear={false}
            className={datePickerClassName}
          />
        ),
        ...props.root,
      }}
      suffix={{
        children: <Icon name="close" className={styles.clearIcon} onClick={onClear} />,
        ...props.suffix,
      }}
    />
  );
};

export default DateMinimizedInput;
