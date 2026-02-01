import { FC, memo } from "react";
import styles from "./SelectOption.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Checkbox from "../checkbox/Checkbox";

export type TypeLabeledValue = {
  value: string | number;
  label: string;
};

export type TypeSelectOption = {
  option: string | number | TypeLabeledValue;
  selected?: boolean;
  multiple?: boolean;
  disabled?: boolean;
};

const SelectOption: FC<TypeSelectOption & TypeFluidContainer> = ({
  option,
  selected,
  multiple,
  disabled,
  onSelect,
  onClick,
  ...props
}) => {
  const { value, label } =
    typeof option === "object"
      ? { value: option.value, label: option.label }
      : { value: option, label: option };

  return (
    <FluidContainer
      dimensionX="fill"
      dimensionY={36}
      alignment="leftCenter"
      onClick={onClick}
      root={{
        children: (
          <Checkbox
            disabled={disabled}
            dimensionX="fill"
            checked={selected}
            label={label}
            alignment="leftCenter"
            prefix={multiple ? undefined : { children: null }}
            root={{
              className: `${props.root?.className} ${styles.displayer}`,
            }}
            labelProps={{ className: styles.displayer }}
          />
        ),
        dimensionX: "fill",
      }}
      {...props}
      className={`${styles.option} ${selected && styles.selected} ${disabled && styles.disabled} ${props.className || ""}`}
    />
  );
};

export default memo(SelectOption);
