import React, { FC } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./InputWithIcon.module.scss";

type TypeInputWithIcon = {
  className?: string;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & TypeFluidContainer;

const InputWithIcon: FC<TypeInputWithIcon> = ({ className, placeholder, inputProps, ...props }) => {
  return (
    <FluidContainer
      className={`${styles.container} ${className}`}
      dimensionY={36}
      root={{
        children: (
          <input
            type={inputProps?.type || "text"}
            {...inputProps}
            placeholder={placeholder}
            className={styles.input}
          />
        ),
        dimensionX: "fill",
        alignment: "leftCenter",
      }}
      {...props}
    />
  );
};

export default InputWithIcon;
