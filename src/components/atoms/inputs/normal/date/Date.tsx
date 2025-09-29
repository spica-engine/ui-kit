import React, { memo } from "react";
import Icon from "@atoms/icon/Icon";
import styles from "./Date.module.scss";
import BaseInput from "@atoms/base-input/BaseInput";
import Text from "@atoms/text/Text";
import DatePicker, { AntDatePickerSharedProps } from "@atoms/date-picker/DatePicker";

type DateRangePickerProps = {
  label?: string;
  description?: string;
  onChange?: (value: Date) => void;
  value?: Date | string | null;
  placeholder?: string;
  inputContainerClassName?: string;
  datePickerProps?: AntDatePickerSharedProps;
};

const DateInput: React.FC<DateRangePickerProps> = ({
  label,
  description,
  onChange,
  value,
  placeholder = "",
  inputContainerClassName,
  datePickerProps,
}) => {
  const handleOnChange = (dateString: string | string[]) => {
    onChange?.(new Date(dateString as string));
  };

  return (
    <BaseInput
      dimensionX="fill"
      alignment="leftCenter"
      description={description}
      labelProps={{
        prefix: { children: <Icon name="calendarBlank" /> },
        root: { children: <Text>{label}</Text> },
      }}
      inputContainerProps={{
        dimensionX: "fill",
        alignment: "leftCenter",
        className: inputContainerClassName,
      }}
    >
      <DatePicker
        placeholder={placeholder}
        suffixIcon={null}
        onChange={handleOnChange}
        value={value}
        {...datePickerProps}
      />
    </BaseInput>
  );
};

export default memo(DateInput);
