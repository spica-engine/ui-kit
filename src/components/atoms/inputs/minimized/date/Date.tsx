import React, { memo } from "react";
import DatePicker from "@atoms/date-picker/DatePicker";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import styles from "./Date.module.scss";
import Button from "@atoms/button/Button";
import Icon from "@atoms/icon/Icon";

type DateInputProps = {
  onChange?: (value: Date) => void;
  value?: Date | string | null;
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
  const handleOnChange = (dateString: string | string[]) => {
    onChange?.(new Date(dateString as string));
  };

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
            onChange={handleOnChange}
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
        ...props.suffix,
        children: (
          <Button variant="text" className={styles.clearButton} keepWidth={false} onClick={onClear}>
            <Icon name="close" />
          </Button>
        ),
      }}
    />
  );
};

export default memo(DateMinimizedInput);
