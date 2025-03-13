import { ChangeEvent, FC, memo } from "react";
import styles from "./Color.module.scss";
import Text from "@atoms/text/Text";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";

type TypeColor = {
  value: string;
  prefixProps?: TypeFlexElement;
  rootProps?: TypeFlexElement;
  onChange?: (value: string) => void;
};

const Color: FC<TypeColor & TypeFluidContainer> = ({
  value = "#000000",
  prefixProps,
  rootProps,
  onChange,
  ...props
}) => {
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <FluidContainer
      dimensionY={36}
      prefix={{
        children: <input type="color" value={value} onChange={handleChangeColor} />,
        ...prefixProps,
      }}
      root={{
        children: value && <Text>{value}</Text>,
        ...rootProps,
      }}
      {...props}
      className={`${props?.className} ${styles.color}`}
    />
  );
};

export default memo(Color);
