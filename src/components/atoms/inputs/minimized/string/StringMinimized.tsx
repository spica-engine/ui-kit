import React, { FC, memo } from "react";
import styles from "./StringMinimized.module.scss";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Text from "@atoms/text/Text";

export type TypeStringMinimized = {
  onClear?: () => void;
  value?: string;
  options?: { label: string; value: string }[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  enumOnChange?: (value: string) => void;
} & TypeFluidContainer;

const StringMinimized: FC<TypeStringMinimized> = ({
  value,
  ...props
}) => {
  return (
    <FluidContainer
      alignment="leftCenter"
      dimensionX="fill"
      className={styles.stringMinimized}
      {...props}
      root={{
        dimensionX: "fill",
        alignment: "leftCenter",
        children: (
          <Text size="medium">{value}</Text>
        ),
        ...props.root,
      }}
    />
  );
};

export default memo(StringMinimized);
