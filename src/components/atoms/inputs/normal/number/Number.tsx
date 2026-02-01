import BaseInput from "@atoms/base-input/BaseInput";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Input, { TypeInput } from "@atoms/input/Input";
import Select, { TypeSelectRef, TypeValue } from "@molecules/select/Select";
import { ChangeEvent, FC, memo, useRef, useState } from "react";
import Text from "@atoms/text/Text";
import styles from "./Number.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { IconName } from "@utils/iconList";

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

  const [forceFocus, setForceFocus] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
    setForceFocus(isFocused);

    if (isFocused && !options) {
      inputRef.current?.focus();
    }
  };

  const handleSelectChange = (value: TypeValue) => {
    onChange?.(value as number);
    setForceFocus(false);
  };

  const handleTypedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isEmptyString = value === "";
    onChange?.(isEmptyString ? undefined : Number(value));
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
        divider: !!label?.trim(),
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
          onChange={handleSelectChange}
          {...selectProps}
          className={`${styles.select} ${selectProps?.className}`}
        />
      ) : (
        <Input
          ref={inputRef}
          value={value}
          type="number"
          onChange={handleTypedChange}
          {...inputProps}
          className={`${styles.input} ${inputProps?.className}`}
        />
      )}
    </BaseInput>
  );
};

export default memo(NumberInput);
