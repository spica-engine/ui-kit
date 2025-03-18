import React, { memo } from "react";
import Icon from "@atoms/icon/Icon";
import styles from "./Date.module.scss";
import BaseInput from "@atoms/base-input/BaseInput";
import Text from "@atoms/text/Text";
import DatePicker from "@atoms/date-picker/DatePicker";

type DateRangePickerProps = {
  label?: string;
  description?: string;
  onChange?: (value: Date) => void;
  value?: Date | string | null;
  placeholder?: string;
  inputContainerClassName?: string;
};

const DateInput: React.FC<DateRangePickerProps> = ({
  label,
  description,
  onChange,
  value,
  placeholder = "",
  inputContainerClassName,
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
      />
    </BaseInput>
  );
};

export default memo(DateInput);
