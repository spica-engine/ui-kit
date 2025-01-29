import BaseInput from "components/atoms/base-input/BaseInput";
import Icon from "components/atoms/icon/Icon";
import Input from "components/atoms/input/Input";
import React, { ChangeEvent, FC, memo, FocusEvent, useState } from "react";
import Enum from "../enum/Enum";
import Text from "components/atoms/text/Text";
import styles from "./String.module.scss";

type TypeString = {
  label: string;
  value?: string;
  className?: string;
  isEnum?: boolean;
  options?: { label: string; value: string }[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const String: FC<TypeString> = memo(
  ({ label, value, className, isEnum, options = [], onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleOnFocusChange = (isFocused: boolean) => {
      console.log("isEisFocusednum", isFocused);

      if (isEnum) {
        console.log("isEnum", isEnum);

        setIsFocused(isFocused);
      }
      if (isFocused) {
        inputRef.current?.focus();
      }
    };
    const inputRef = React.createRef<HTMLInputElement>();
    return (
      <BaseInput
        dimensionX={"fill"}
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
      >
        {isEnum ? (
          <Enum label={label} options={options} value={value}></Enum>
        ) : (
          <Input
            ref={inputRef}
            value={value}
            className={className}
            onChange={onChange}
            dimensionX={"fill"}
          />
        )}
      </BaseInput>
    );
  }
);

export default String;
