import { FC } from "react";
import styles from "./Color.module.scss";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";
import { IconName } from "utils/iconList";
import BaseInput from "components/atoms/base-input/BaseInput";
import Color from "components/atoms/color/Color";

type TypeColorInput = {
  label: string;
  prefixIcon?: IconName;
  value: string;
  containerProps?: {
    container?: TypeFluidContainer;
  };

  onChange?: (value: string) => void;
};

const ColorInput: FC<TypeColorInput> = ({
  label,
  prefixIcon = "invertColors",
  value = "#000000",
  onChange,
}) => {
  const handleChangeColor = (value: string) => {
    onChange?.(value);
  };

  return (
    <BaseInput
      labelProps={{
        icon: { name: prefixIcon },
        title: { children: label },
      }}
      root={{
        children: <Color value={value} onChange={handleChangeColor} />,
      }}
    />
  );
};

export default ColorInput;
