import BaseInput from "@atoms/base-input/BaseInput";
import Icon from "@atoms/icon/Icon";
import Input, { TypeInput } from "components/atoms/input/Input";
import React, { FC, memo, useState, useRef } from "react";
import Text from "@atoms/text/Text";
import styles from "./String.module.scss";
import Select, { TypeSelectRef } from "@molecules/select/Select";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { IconName } from "@utils/iconList";

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
  const [forceFocus, setForceFocus] = useState(false);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
    setForceFocus(isFocused);

    if (isFocused && !options) {
      inputRef.current?.focus();
    }
  };

  return (
    <BaseInput
      dimensionX={"fill"}
      description={description}
      forceFocus={forceFocus}
      dropDownRef={dropDownRef}
      onFocusChange={(isFocused) => handleOnFocusChange(isFocused)}
      labelProps={{
        dimensionX: "hug",
        divider: !!label && label.trim() !== "",
        prefix: {
          children: <Icon className={styles.icon} name={iconName} />,
        },
        root: label
          ? {
              dimensionX: "hug",
              children: (
                <Text className={styles.text} size="medium">
                  {label}
                </Text>
              ),
            }
          : undefined,
      }}
      inputContainerProps={{ className: `${styles.baseInput} ${inputContainerClassName}` }}
      {...props}
    >
      {!!options ? (
        <Select
          selectRef={selectRef}
          externalDropdownRef={dropDownRef}
          disableClick
          options={options}
          value={value}
          placeholder=""
          onChange={(value) => {
            onChange?.(value as string);
            setForceFocus(false);
          }}
          {...selectProps}
          className={`${styles.select} ${selectProps?.className}`}
        />
      ) : (
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          {...inputProps}
          className={`${styles.input} ${inputProps?.className}`}
        />
      )}
    </BaseInput>
  );
};

export default memo(StringInput);
