import { FC, memo } from "react";
import styles from "./SelectOption.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text from "../text/Text";
import Checkbox from "../checkbox/Checkbox";

export type TypeLabeledValue = {
  value: string | number;
  label: string;
};

type TypeSelectOption = {
  option: string | number | TypeLabeledValue;
  selected?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  onSelect: (value: string | number) => void;
};

const SelectOption: FC<TypeSelectOption & TypeFluidContainer> = ({
  option,
  selected,
  multiple,
  disabled,
  onSelect,
  ...props
}) => {
  const { value, label } =
    typeof option === "object"
      ? { value: option.value, label: option.label }
      : { value: option, label: option };

  const handleClick = (value: string | number) => {
    if (disabled) return;
    onSelect(value);
  };

  return (
    <FluidContainer
      key={value}
      dimensionX="fill"
      dimensionY={36}
      alignment="leftCenter"
      onClick={() => handleClick(value)}
      className={`${styles.option} ${selected && styles.selected} ${disabled && styles.disabled}`}
      root={{
        children: multiple ? (
          <Checkbox
            disabled={disabled}
            dimensionX="fill"
            checked={selected}
            label={label}
            alignment="leftCenter"
          />
        ) : (
          <Text dimensionX="fill" alignment="leftCenter">
            {label}
          </Text>
        ),
        dimensionX: "fill",
      }}
      {...props}
    />
  );
};

export default memo(SelectOption);
