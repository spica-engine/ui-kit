import { ChangeEvent, FC } from "react";
import styles from "./Color.module.scss";
import Text from "components/atoms/text/Text";
import FluidContainer, {
  FluidContainerProps,
} from "components/atoms/fluid-container/FluidContainer";
import { FlexElementProps } from "components/atoms/flex-element/FlexElement";

type TypeColor = {
  value: string;
  containerProps?: FluidContainerProps;
  prefixProps?: FlexElementProps;
  rootProps?: FlexElementProps;
  onChange?: (value: string) => void;
};

const Color: FC<TypeColor> = ({
  value = "#000000",
  containerProps,
  prefixProps,
  rootProps,
  onChange,
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
      className={`${containerProps?.className} ${styles.color}`}
      {...containerProps}
    />
  );
};

export default Color;
