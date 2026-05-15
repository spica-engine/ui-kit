import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import FlexElement from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Input, { TypeInput } from "@atoms/input/Input";
import Select, { TypeSelectRef, TypeValue } from "@molecules/select/Select";
import { ChangeEvent, FC, memo, useRef, useState } from "react";
import Text from "@atoms/text/Text";
import styles from "./Number.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { IconName } from "@utils/iconList";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

export type TypeNumberInput = {
  label?: string;
  description?: string;
  value?: number;
  options?: number[];
  onChange?: (value: number | undefined) => void;
  inputProps?: TypeInput;
  selectProps?: TypeFluidContainer;
  inputContainerClassName?: string;
  iconName?: IconName;
};

const NumberInput: FC<TypeNumberInput & TypeFlexElement> = ({
  label,
  description,
  value,
  options,
  onChange,
  selectProps,
  inputProps,
  inputContainerClassName,
  iconName = "numericBox",
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

  const handleSelectChange = (val: TypeValue) => {
    onChange?.(val as number);
    setIsFocused(false);
  };

  const handleTypedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange?.(v === "" ? undefined : Number(v));
  };

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
          <span className={styles.fieldType}>number</span>
        </div>
      )}
      <div
        className={`${styles.inputBox} ${isFocused ? styles.focused : ""} ${inputContainerClassName ?? ""}`}
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
            onChange={handleSelectChange}
            {...selectProps}
            className={`${styles.select} ${selectProps?.className ?? ""}`}
          />
        ) : (
          <Input
            ref={inputRef}
            value={value}
            type="number"
            placeholder={label ? `Enter ${label}` : undefined}
            onChange={handleTypedChange}
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

export default memo(NumberInput);
