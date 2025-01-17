import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import Text from "components/atoms/text/Text";
import FluidContainer, {
  FluidContainerProps,
} from "components/atoms/fluid-container/FluidContainer";
import Switch from "components/atoms/switch/Switch";
import { FlexElementProps } from "components/atoms/flex-element/FlexElement";

export type TypeInputBoolean = {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  containerProps?: FluidContainerProps;
  switchContainerProps?: FlexElementProps;
  suffixProps?: FlexElementProps;
  rootProps?: FlexElementProps;
  labelProps?: FlexElementProps;
  onChange?: (checked: boolean) => void;
};

const InputBoolean: FC<TypeInputBoolean> = memo(
  ({
    checked,
    disabled = false,
    label,
    containerProps,
    switchContainerProps,
    suffixProps,
    rootProps,
    labelProps,
    onChange,
  }) => {
    return (
      <FluidContainer
        {...containerProps}
        gap={10}
        dimensionY={36}
        root={{
          children: (
            <Switch
              checked={checked}
              disabled={disabled}
              {...switchContainerProps}
              onChange={onChange}
            />
          ),
          ...rootProps,
        }}
        suffix={{
          children: label && <Text {...labelProps}>{label}</Text>,
          ...suffixProps,
        }}
      />
    );
  }
);

export default InputBoolean;
