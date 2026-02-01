import React, { useMemo, useRef, useState } from "react";
import { DatePicker as AntDatePicker, Tag } from "antd";
import type { DatePickerProps as AntDatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./DatePicker.module.scss";

export type AntDatePickerSharedProps = Omit<AntDatePickerProps, "value" | "onChange">;

export type DatePickerProps = {
  onChange?: (value: string | string[] | null) => void;
  value: Date | string | null | undefined;
  renderLabel?: (label: string) => React.ReactNode;
} & AntDatePickerSharedProps;

const DatePicker = ({ value, onChange, renderLabel, ...props }: DatePickerProps) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (date: Dayjs, dateString: string | string[]) => {
    onChange?.(dateString);
    setPopupOpen(false);
  };

  const parsedValue = useMemo(() => dayjs(value), [value]);

  const isValidDate = parsedValue.isValid();
  const antDatePickerVisible = typeof value !== "string" || isValidDate || value === "";

  const normalizedPickerValue = isValidDate ? parsedValue : null;

  const handleOpenPicker = () => {
    setPopupOpen(true);
    setTimeout(() => {
      pickerRef.current?.focus();
    }, 100);
  };

  return (
    <>
      <AntDatePicker
        {...props}
        ref={pickerRef as any}
        open={popupOpen}
        onOpenChange={setPopupOpen}
        value={normalizedPickerValue}
        onChange={handleOnChange}
        className={`${styles.datePicker} ${props.className || ""} ${!antDatePickerVisible ? styles.hiddenAntDatePicker : ""}`}
      />
      {!antDatePickerVisible && (
        <div className={styles.stringValueWrapper} onClick={handleOpenPicker}>
          {renderLabel ? (
            renderLabel(value)
          ) : (
            <Tag color="default" className={styles.stringValue}>
              {value}
            </Tag>
          )}
        </div>
      )}
    </>
  );
};
export default DatePicker;
