import { FC, memo, useLayoutEffect, useRef, useState } from "react";
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
  const [displayerWidth, setDisplayerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { value, label } =
    typeof option === "object"
      ? { value: option.value, label: option.label }
      : { value: option, label: option };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setDisplayerWidth(containerRef.current?.offsetWidth - 50);
  }, []);

  return (
    <FluidContainer
      ref={containerRef}
      dimensionX="fill"
      dimensionY={36}
      alignment="leftCenter"
      onClick={onClick}
      className={`${styles.option} ${selected && styles.selected} ${disabled && styles.disabled}`}
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
            labelProps={{ style: { maxWidth: displayerWidth }, className: styles.displayer }}
          />
        ),
        dimensionX: "fill",
      }}
      {...props}
    />
  );
};

export default memo(SelectOption);
