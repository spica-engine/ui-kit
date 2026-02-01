import Button from "@atoms/button/Button";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import Input from "@atoms/input/Input";
import Select, { TypeSelectRef } from "@molecules/select/Select";
import React, { FC, memo, useRef } from "react";
import styles from "./NumberMinimized.module.scss";

export type TypeNumberMinimized = {
  onClear?: () => void;
  value?: number;
  options?: number[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: number) => void;
} & TypeFluidContainer;

const NumberMinimized: FC<TypeNumberMinimized> = ({
  onClear,
  value,
  options,
  inputProps,
  onChange,
  ...props
}) => {
  const selectRef = useRef<TypeSelectRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onClear?.();

    if (selectRef.current) {
      selectRef.current.clear();
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FluidContainer
      alignment="leftCenter"
      dimensionX="fill"
      className={styles.numberMinimized}
      {...props}
      root={{
        dimensionX: "fill",
        alignment: "leftCenter",
        children: options ? (
          <Select
            selectRef={selectRef}
            className={styles.select}
            placeholder={value !== undefined ? String(value) : ""}
            value={value}
            options={options || []}
            onChange={(value) => onChange?.(value as number)}
          />
        ) : (
          <Input
            ref={inputRef}
            value={value ?? ""}
            type="number"
            {...inputProps}
            onChange={(event) => onChange?.(Number(event.target.value))}
          />
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
            onClick={handleClear}
            className={styles.closeIcon}
          />
        ),
        ...props.suffix,
      }}
    />
  );
};

export default memo(NumberMinimized);
