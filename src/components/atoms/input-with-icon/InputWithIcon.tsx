import React, { ChangeEventHandler, FC, memo } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./InputWithIcon.module.scss";
import Input from "../input/Input";
import { TypeFlexElement } from "../flex-element/FlexElement";

type TypeInputWithIcon = {
  value?: string | number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputContainerProps?: TypeFlexElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & TypeFluidContainer;

const InputWithIcon: FC<TypeInputWithIcon> = ({
  value,
  disabled,
  className,
  placeholder,
  inputProps,
  inputContainerProps,
  onChange,
  ...props
}) => {
  return (
    <FluidContainer
      ref={props.ref}
      className={`${styles.container} ${className} ${disabled && styles.disabled}`}
      dimensionY={36}
      root={{
        children: (
          <Input
            value={value}
            disabled={disabled}
            type={inputProps?.type || "text"}
            placeholder={placeholder}
            className={`${inputContainerProps?.className} ${styles.input}`}
            onChange={onChange}
            {...inputContainerProps}
          />
        ),
        dimensionX: "fill",
        alignment: "leftCenter",
      }}
      {...props}
    />
  );
};

export default memo(InputWithIcon);
