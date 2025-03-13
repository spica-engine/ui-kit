import React, { FC, memo, useState } from "react";
import styles from "./StringMinimized.module.scss";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Input from "@atoms/input/Input";
import Select from "@molecules/select/Select";
import Button from "@atoms/button/Button";
import Icon from "@atoms/icon/Icon";

type TypeStringMinimized = {
  onClear?: () => void;
  value?: string;
  options?: { label: string; value: string }[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  enumOnChange?: (value: string) => void;
} & TypeFluidContainer;

const StringMinimized: FC<TypeStringMinimized> = ({
  onClear,
  value,
  options,
  inputProps,
  enumOnChange,
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
        children: options ? (
          <Select
            className={styles.select}
            placeholder={value || " "}
            options={options || []}
            onChange={(value) => enumOnChange?.(String(value))}
          />
        ) : (
          <Input value={value} {...inputProps} />
        ),
        ...props.root,
      }}
      suffix={{
        dimensionX: "hug",
        alignment: "center",
        children: (
          <Button
            children={<Icon name="close" />}
            color="transparent"
            onClick={onClear}
            className={styles.closeIcon}
          />
        ),
        ...props.suffix,
      }}
    />
  );
};

export default memo(StringMinimized);
