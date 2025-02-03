import React, { memo } from "react";
import Icon from "components/atoms/icon/Icon";
import styles from "./Date.module.scss";
import BaseInput from "components/atoms/base-input/BaseInput";
import Text from "components/atoms/text/Text";
import DatePicker from "components/atoms/date-picker/DatePicker";
import { Dayjs } from "dayjs";
type DateRangePickerProps = {
  label?: string;
  description?: string;
  onChange?: (date: Dayjs, dateString: string | string[]) => void;
  value?: Dayjs | null;
  placeholder?: string;
};

const DateInput: React.FC<DateRangePickerProps> = ({
  label,
  description,
  onChange,
  value,
  placeholder = "",
}) => {
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
      }}
    >
      <DatePicker placeholder={placeholder} suffixIcon={null} onChange={onChange} value={value} />
    </BaseInput>
  );
};

export default memo(DateInput);
