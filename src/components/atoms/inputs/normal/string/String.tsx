import BaseInput from "../../../../../components/atoms/base-input/BaseInput";
import Icon from "../../../../../components/atoms/icon/Icon";
import Input, { TypeInput } from "components/atoms/input/Input";
import React, { FC, memo, useState, useRef } from "react";
import Text from "../../../../../components/atoms/text/Text";
import styles from "./String.module.scss";
import Select, { TypeSelectRef } from "../../../../../components/molecules/select/Select";
import { TypeFlexElement } from "../../../../../components/atoms/flex-element/FlexElement";
import { TypeFluidContainer } from "../../../../../components/atoms/fluid-container/FluidContainer";

type TypeStringInput = {
  label?: string;
  description?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
  inputProps?: TypeInput;
  selectProps?: TypeFluidContainer;
  inputContainerClassName?: string;
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
      description={description}
      forceFocus={forceFocus}
      onFocusChange={(isFocused) => handleOnFocusChange(isFocused)}
      labelProps={{
        dimensionX: "hug",
        divider: true,
        prefix: {
          children: <Icon className={styles.icon} name="formatQuoteClose" />,
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
