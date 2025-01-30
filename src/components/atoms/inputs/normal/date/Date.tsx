import React, { memo, useState } from "react";
import dayjs from "dayjs";
import Icon from "components/atoms/icon/Icon";
import styles from "./Date.module.scss";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import BaseInput from "components/atoms/base-input/BaseInput";
import Text from "components/atoms/text/Text";
import DatePicker from "components/atoms/date-picker/DatePicker";
import type { DatePickerProps } from "antd";
import { Dayjs } from "dayjs";
type DateRangePickerProps = {
  label?: string;
  onChange?: (date: Dayjs, dateString: string | string[]) => void;
  value?: Dayjs | null;
  placeholder?: string;
};

const DateInput: React.FC<DateRangePickerProps> = ({ label, onChange, value, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [pickerFocused, setPickerFocused] = useState(false);

  const onFocusChange = (isFocused: boolean) => {
    setIsFocused(isFocused);
    setPickerFocused(isFocused);
  };

  return (
    <BaseInput
      dimensionX="fill"
      alignment="leftCenter"
      labelProps={{
        prefix: { children: <Icon name="calendarBlank" /> },
        root: { children: <Text>{label}</Text> },
      }}
      inputContainerProps={{
        dimensionX: "fill",
        alignment: "leftCenter",
      }}
      onFocusChange={onFocusChange}
    >
      <DatePicker suffixIcon={null} onChange={onChange} value={value} />
    </BaseInput>
  );
};

export default memo(DateInput);
