import { FC, memo } from "react";
import styles from "./Color.module.scss";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";
import BaseInput from "components/atoms/base-input/BaseInput";
import Color from "components/atoms/color/Color";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import { TypeFlexElement } from "components/atoms/flex-element/FlexElement";

type TypeColorInput = {
  label: string;
  description?: string;
  value?: string;
  labelProps?: TypeFluidContainer;
  colorContainerProps?: TypeFluidContainer;
  inputContainerClassName?: string;
  onChange?: (value: string) => void;
};

const ColorInput: FC<TypeColorInput & TypeFlexElement> = ({
  label,
  description,
  value = "#000000",
  labelProps,
  colorContainerProps,
  inputContainerClassName,
  onChange,
  ...props
}) => {
  const handleChangeColor = (value: string) => {
    onChange?.(value);
  };

  return (
    <BaseInput
      dimensionX={"fill"}
      description={description}
      labelProps={{
        dimensionX: "hug",
        divider: true,
        prefix: {
          children: <Icon className={styles.icon} name="invertColors" />,
        },
        root: {
          dimensionX: "hug",
          children: (
            <Text className={styles.text} size="medium">
              {label}
            </Text>
          ),
        },
        ...labelProps,
      }}
      inputContainerProps={{ className: `${styles.baseInput} ${inputContainerClassName}` }}
      {...props}
    >
      <Color
        dimensionX={"fill"}
        value={value}
        onChange={handleChangeColor}
        {...colorContainerProps}
      />
    </BaseInput>
  );
};

export default memo(ColorInput);
