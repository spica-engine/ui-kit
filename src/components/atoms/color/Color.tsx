import { ChangeEvent, FC, memo } from "react";
import styles from "./Color.module.scss";
import Text from "components/atoms/text/Text";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import { TypeFlexElement } from "components/atoms/flex-element/FlexElement";

type TypeColor = {
  value: string;
  containerProps?: TypeFluidContainer;
  prefixProps?: TypeFlexElement;
  rootProps?: TypeFlexElement;
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

export default memo(Color);
