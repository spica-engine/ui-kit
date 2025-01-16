import { ChangeEvent, FC } from "react";
import styles from "./Color.module.scss";
import Text from "components/atoms/text/Text";
import FluidContainer, {
  FluidContainerProps,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import { FlexElementProps } from "components/atoms/flex-element/FlexElement";
import { IconName } from "utils/iconList";

type TypeColorInput = {
  value: string;
  placeholder?: string;
  containerProps?: FluidContainerProps;
  prefixContainerProps?: FlexElementProps;
  rootContainerProps?: FlexElementProps;
  prefixIcon?: IconName;
  prefixIconProps?: FlexElementProps;
  prefixLabel?: string;
  prefixLabelProps?: FlexElementProps;
  onChange?: (value: string) => void;
};

const ColorInput: FC<TypeColorInput> = ({
  value = "#000000",
  prefixIcon,
  prefixIconProps,
  prefixLabel,
  prefixLabelProps,
  containerProps = { ...{ dimensionX: "fill", alignment: "leftCenter", gap: 15 } },
  prefixContainerProps = { ...{ dimensionX: 85, alignment: "leftCenter" } },
  rootContainerProps = { ...{ dimensionY: 36 } },
  onChange,
}) => {
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <FluidContainer
      {...containerProps}
      className={`${containerProps.className} ${styles.colorInput}`}
      prefix={{
        children: (
          <FluidContainer
            {...prefixContainerProps}
            className={styles.prefixContainer}
            prefix={{
              children: prefixIcon && <Icon name={prefixIcon} {...prefixIconProps} />,
            }}
            root={{
              children: prefixLabel && (
                <Text className={styles.label} {...prefixLabelProps}>
                  {prefixLabel}
                </Text>
              ),
            }}
          />
        ),
      }}
      root={{
        children: (
          <FluidContainer
            {...rootContainerProps}
            prefix={{
              children: <input type="color" value={value} onChange={handleChangeColor} />,
            }}
            root={{
              children: value && <Text>{value}</Text>,
            }}
          />
        ),
      }}
    />
  );
};

export default ColorInput;
