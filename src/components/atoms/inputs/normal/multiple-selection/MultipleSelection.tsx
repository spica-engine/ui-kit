import BaseInput from "components/atoms/base-input/BaseInput";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import React, { memo, useRef, useState } from "react";
import styles from "./MultipleSelection.module.scss";
import Select, { TypeSelectRef } from "components/molecules/select/Select";
import { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";

type TypeMultipleSelection<T = string | number> = {
  label: string;
  value?: T[];
  options?: T[];
  onChange?: (value: T[]) => void;
  selectProps?: TypeFluidContainer;
} & TypeFlexElement;

const MultipleSelection = <T extends string | number>({
  label,
  value = [],
  options,
  onChange,
  selectProps,
  ...props
}: TypeMultipleSelection<T>) => {
  const selectRef = useRef<TypeSelectRef>(null);

  const [forceFocus, setForceFocus] = useState(false);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
    setForceFocus(isFocused);
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
      inputContainerProps={{ className: styles.baseInput }}
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

export default memo(MultipleSelection);
