import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Text from "@atoms/text/Text";
import React, { FC, memo } from "react";
import styles from "./NumberMinimized.module.scss";

export type TypeNumberMinimized = {
  onClear?: () => void;
  value?: number;
  options?: number[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: number) => void;
} & TypeFluidContainer;

const NumberMinimized: FC<TypeNumberMinimized> = ({
  value,
  ...props
}) => {
  return (
    <FluidContainer
      alignment="leftCenter"
      dimensionX="fill"
      className={styles.numberMinimized}
      {...props}
      root={{
        dimensionX: "fill",
        alignment: "leftCenter",
        children: (
          <Text size="medium">{value !== undefined ? String(value) : ""}</Text>
        ),
        ...props.root,
      }}
    />
  );
};

export default memo(NumberMinimized);
