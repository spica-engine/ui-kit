import BaseInput from "components/atoms/base-input/BaseInput";
import { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Icon from "components/atoms/icon/Icon";
import Input from "components/atoms/input/Input";
import Select, { TypeSelectRef } from "components/molecules/select/Select";
import React, { FC, memo, useRef, useState } from "react";
import Text from "components/atoms/text/Text";
import styles from "./Number.module.scss";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";

type TypeNumberInput = {
  label: string;
  value?: number;
  options?: number[];
  onChange?: (value: number) => void;
  inputProps?: TypeFlexElement;
  selectProps?: TypeFluidContainer;
};

const NumberInput: FC<TypeNumberInput & TypeFlexElement> = ({
  label,
  value,
  options,
  onChange,
  selectProps,
  inputProps,
  ...props
}) => {
  const selectRef = useRef<TypeSelectRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      forceFocus={forceFocus}
      onFocusChange={(isFocused) => handleOnFocusChange(isFocused)}
      labelProps={{
        dimensionX: "hug",
        divider: true,
        prefix: {
          children: <Icon className={styles.icon} name="numericBox" />,
        },
        root: {
          dimensionX: "hug",
          children: (
            <Text className={styles.text} size="medium">
              {label}
            </Text>
          ),
        },
      }}
      inputContainerProps={{ className: styles.baseInput }}
      {...props}
    >
      {!!options ? (
        <Select
          className={`${styles.select} ${selectProps?.className}`}
          selectRef={selectRef}
          disableClick
          options={options}
          value={value}
          placeholder=""
          onChange={(value) => {
            onChange?.(value as number);
            setForceFocus(false);
          }}
          {...selectProps}
        />
      ) : (
        <Input
          dimensionX={"fill"}
          inputRef={inputRef}
          value={value}
          type="number"
          className={`${styles.input} ${inputProps?.className}`}
          onChange={(e) => onChange?.(Number(e.target.value))}
          {...inputProps}
        />
      )}
    </BaseInput>
  );
};

export default memo(NumberInput);
