import BaseInput from "@atoms/base-input/BaseInput";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Input, { TypeInput } from "@atoms/input/Input";
import Select, { TypeSelectRef } from "@molecules/select/Select";
import { FC, memo, useRef, useState } from "react";
import Text from "@atoms/text/Text";
import styles from "./Number.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

export type TypeNumberInput = {
  label: string;
  description?: string;
  value?: number;
  options?: number[];
  onChange?: (value: number) => void;
  inputProps?: TypeInput;
  selectProps?: TypeFluidContainer;
  inputContainerClassName?: string;
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
  ...props
}) => {
  const selectRef = useRef<TypeSelectRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [forceFocus, setForceFocus] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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
            onChange?.(value as number);
            setForceFocus(false);
          }}
          {...selectProps}
          className={`${styles.select} ${selectProps?.className}`}
        />
      ) : (
        <Input
          ref={inputRef}
          value={value}
          type="number"
          onChange={(e) => onChange?.(Number(e.target.value))}
          {...inputProps}
          className={`${styles.input} ${inputProps?.className}`}
        />
      )}
    </BaseInput>
  );
};

export default memo(NumberInput);
