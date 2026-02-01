import React, { memo } from "react";
import Icon from "@atoms/icon/Icon";
import styles from "./Date.module.scss";
import BaseInput from "@atoms/base-input/BaseInput";
import Text from "@atoms/text/Text";
import DatePicker, { AntDatePickerSharedProps } from "@atoms/date-picker/DatePicker";
import { Tag } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

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
  const handleOnChange = (dateString: string | string[] | null) => {
    onChange?.(new Date(dateString as string));
  };

  return (
    <BaseInput
      dimensionX="fill"
      alignment="leftCenter"
      description={description}
      labelProps={{
        prefix: { children: <Icon name="calendarBlank" /> },
        root: { children: <Text className={styles.text}>{label}</Text> },
      }}
      inputContainerProps={{
        dimensionX: "fill",
        alignment: "leftCenter",
        className: `${inputContainerClassName} ${styles.dateInput}`,
      }}
    >
      <DatePicker
        placeholder={placeholder}
        suffixIcon={null}
        onChange={handleOnChange}
        value={value}
        renderLabel={(v) => (
          <div className={styles.stringValueWrapper}>
            <Tag color="default" className={styles.stringValue}>
              {v}
            </Tag>
            <div className={styles.iconGroup}>
              <CloseCircleFilled className={styles.clearIcon} onClick={() => handleOnChange("")} />
            </div>
          </div>
        )}
        {...datePickerProps}
      />
    </BaseInput>
  );
};

export default memo(DateInput);
