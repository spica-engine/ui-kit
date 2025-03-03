import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import Text, { TypeText } from "../../../../../components/atoms/text/Text";
import FluidContainer, {
  TypeFluidContainer,
} from "../../../../../components/atoms/fluid-container/FluidContainer";
import Switch from "../../../../../components/atoms/switch/Switch";
import FlexElement, {
  TypeFlexElement,
} from "../../../../../components/atoms/flex-element/FlexElement";

export type TypeBooleanInput = {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  containerProps?: TypeFluidContainer;
  switchContainerProps?: TypeFlexElement;
  suffixProps?: TypeFlexElement;
  rootProps?: TypeFlexElement;
  labelProps?: TypeText;
  description?: string;
  onChange?: (checked: boolean) => void;
};

const BooleanInput: FC<TypeBooleanInput> = ({
  checked = false,
  disabled = false,
  label,
  containerProps,
  switchContainerProps,
  suffixProps,
  rootProps,
  labelProps,
  description,
  onChange,
}) => {
  return (
    <FlexElement dimensionX="fill" alignment="leftCenter" direction="vertical">
      <FluidContainer
        dimensionY={36}
        dimensionX="fill"
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
        className={`${containerProps?.className} ${styles.container}`}
        {...containerProps}
      />
      <Text size="xsmall" className={`${styles.description}`}>
        {description}
      </Text>
    </FlexElement>
  );
};

export default memo(BooleanInput);
