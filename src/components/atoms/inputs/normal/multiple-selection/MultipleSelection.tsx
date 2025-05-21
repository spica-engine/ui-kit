import BaseInput from "@atoms/base-input/BaseInput";
import Icon from "@atoms/icon/Icon";
import Text from "@atoms/text/Text";
import React, { memo, useRef, useState } from "react";
import styles from "./MultipleSelection.module.scss";
import Select, { TypeSelectRef } from "@molecules/select/Select";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

export type TypeMultipleSelectionInput<T = string | number> = {
  label: string;
  description?: string;
  value?: T[];
  options?: T[];
  onChange?: (value: T[]) => void;
  selectProps?: TypeFluidContainer;
  inputContainerClassName?: string;
} & TypeFlexElement;

const MultipleSelectionInput = <T extends string | number>({
  label,
  description,
  value = [],
  options,
  onChange,
  selectProps,
  inputContainerClassName,
  ...props
}: TypeMultipleSelectionInput<T>) => {
  const selectRef = useRef<TypeSelectRef>(null);

  const [forceFocus, setForceFocus] = useState(false);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
    setForceFocus(isFocused);
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
          children: <Icon className={styles.icon} name="formatListChecks" />,
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
      <Select
        selectRef={selectRef}
        disableClick
        options={options || []}
        value={value}
        placeholder=""
        multiple={true}
        onChange={(value) => {
          onChange?.(value as T[]);
        }}
        {...selectProps}
        className={`${styles.select} ${selectProps?.className}`}
      />
    </BaseInput>
  );
};

export default memo(MultipleSelectionInput);
