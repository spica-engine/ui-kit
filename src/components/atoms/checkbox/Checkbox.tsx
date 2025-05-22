import React, { FC, memo, ReactNode, useState } from "react";
import styles from "./Checkbox.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text, { TypeText } from "../text/Text";

export type TypeCheckbox = {
  checked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  indeterminate?: boolean;
  labelProps?: TypeText;
  onChange?: (checked: boolean) => void;
};

const Checkbox: FC<TypeCheckbox & TypeFluidContainer> = ({
  checked,
  disabled,
  label,
  indeterminate,
  labelProps,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(checked);

  const handleClick = () => {
    if (disabled) return;
    setValue(!value);
    onChange?.(!value);
  };

  return (
    <FluidContainer
      {...props}
      dimensionY={36}
      onClick={handleClick}
      className={`${props.className} ${styles.container} ${disabled && styles.disabled}`}
      prefix={{
        children: (
          <div className={`${styles.checkbox} ${indeterminate && styles.indeterminate}`}>
            <input type="checkbox" checked={value} />
            <label htmlFor="checkbox" />
          </div>
        ),
        ...props.prefix,
      }}
      root={{ children: <Text {...labelProps}>{label}</Text>, ...props.root }}
    />
  );
};

export default memo(Checkbox);
