import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import React, { FC, useState } from "react";
import styles from "./ColorMinimized.module.scss";
import Color from "@atoms/color/Color";
import Button from "@atoms/button/Button";
import Icon from "@atoms/icon/Icon";

export type TypeColorMinimized = {
  value?: string;
  onClear?: () => void;
  onChange?: (value: string) => void;
} & TypeFluidContainer;

const ColorMinimized: FC<TypeColorMinimized> = ({
  value = "#000000",
  onClear,
  onChange,
  ...props
}) => {
  const [color, setColor] = useState(value);

  const handleChangeColor = (newValue: string) => {
    setColor(newValue);
    onChange?.(newValue);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setColor("");
    onChange?.("");
    onClear?.();
  };
  return (
    <FluidContainer
      alignment="leftCenter"
      dimensionX="fill"
      className={styles.colorMinimized}
      {...props}
      root={{
        dimensionX: "fill",
        alignment: "leftCenter",
        children: <Color value={color || "#000000"} onChange={handleChangeColor} />,
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

export default ColorMinimized;
