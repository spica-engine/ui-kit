import BaseInput from "components/atoms/base-input/BaseInput";
import Icon from "components/atoms/icon/Icon";
import Input from "components/atoms/input/Input";
import React, { FC, memo, useState, useRef } from "react";
import Text from "components/atoms/text/Text";
import styles from "./String.module.scss";
import { TypeLabeledValue } from "components/atoms/select-option/SelectOption";
import Select from "components/molecules/select/Select";

type TypeStringInput = {
  label: string;
  value?: string;
  className?: string;
  options?: (string | TypeLabeledValue)[];
  onChange?: (value: string) => void;
};

const StringInput: FC<TypeStringInput> = ({ label, value, className, options, onChange }) => {
  const selectRef = useRef<any>(null);

  const [myFocus, setMyFocus] = useState(false);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
    setMyFocus(isFocused);

    if (isFocused) {
      inputRef.current?.focus();
    }
  };

  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <BaseInput
      dimensionX={"fill"}
      forceFocus={myFocus}
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
      inputContainerProps={{ className: styles.baseInput }}
    >
      {!!options ? (
        <Select
          className={styles.select}
          selectRef={selectRef}
          disableClick
          options={options}
          value={value}
          placeholder=""
          onChange={(value) => {
            onChange?.(value as string);
            setMyFocus(false);
          }}
        />
      ) : (
        <Input
          ref={inputRef}
          value={value}
          className={`${styles.input}`}
          onChange={(e) => onChange?.(e.target.value)}
          dimensionX={"fill"}
        />
      )}
    </BaseInput>
  );
};

export default memo(StringInput);
