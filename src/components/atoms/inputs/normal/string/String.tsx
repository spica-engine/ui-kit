import Icon from "@atoms/icon/Icon";
import Input, { TypeInput } from "components/atoms/input/Input";
import React, { FC, memo, useState, useRef } from "react";
import Text from "@atoms/text/Text";
import styles from "./String.module.scss";
import Select, { TypeSelectRef } from "@molecules/select/Select";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { IconName } from "@utils/iconList";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

export type TypeStringInput = {
  label?: string;
  description?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
  inputProps?: TypeInput;
  selectProps?: TypeFluidContainer;
  inputContainerClassName?: string;
  iconName?: IconName;
};

const StringInput: FC<TypeStringInput & TypeFlexElement> = ({
  label,
  description,
  value,
  options,
  onChange,
  selectProps,
  inputProps,
  inputContainerClassName,
  iconName = "formatQuoteClose",
  ...props
}) => {
  const selectRef = useRef<TypeSelectRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = (focused: boolean) => {
    selectRef?.current?.toggleDropdown(focused);
    setIsFocused(focused);
    if (focused && !options) {
      inputRef.current?.focus();
    }
  };

  useOnClickOutside({
    targetElements: [containerRef, dropDownRef],
    onClickOutside: () => handleFocusChange(false),
  });

  return (
    <FlexElement
      direction="vertical"
      alignment="leftTop"
      dimensionX="fill"
      ref={containerRef}
      {...props}
      className={`${styles.field} ${props.className ?? ""}`}
    >
      {label && (
        <div className={styles.fieldHead}>
          <div className={styles.fieldName}>
            <Icon className={styles.icon} name={iconName} />
            <span>{label}</span>
          </div>
          <span className={styles.fieldType}>string</span>
        </div>
      )}
      <div
        className={`${styles.inputBox} ${isFocused ? styles.inputBoxFocused : ""} ${inputContainerClassName ?? ""}`}
        onClick={() => handleFocusChange(true)}
      >
        {options ? (
          <Select
            selectRef={selectRef}
            externalDropdownRef={dropDownRef}
            disableClick
            options={options}
            value={value}
            placeholder=""
            onChange={(val) => {
              onChange?.(val as string);
              setIsFocused(false);
            }}
            {...selectProps}
            className={`${styles.select} ${selectProps?.className ?? ""}`}
          />
        ) : (
          <Input
            ref={inputRef}
            value={value}
            placeholder={label ? `Enter ${label}` : undefined}
            onChange={(e) => onChange?.(e.target.value)}
            {...inputProps}
            className={`${styles.input} ${inputProps?.className ?? ""}`}
          />
        )}
      </div>
      {description && (
        <Text size="xsmall" variant="secondary" className={styles.description}>
          {description}
        </Text>
      )}
    </FlexElement>
  );
};

export default memo(StringInput);
