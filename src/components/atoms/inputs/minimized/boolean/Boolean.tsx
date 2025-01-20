import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Switch from "components/atoms/switch/Switch";

export type TypeInputBooleanMinimized = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: TypeFlexElement;
  onChange?: (checked: boolean) => void;
};

const InputBooleanMinimized: FC<TypeInputBooleanMinimized> = memo(
  ({ checked, disabled = false, containerProps, onChange }) => {
    return <Switch checked={checked} disabled={disabled} {...containerProps} onChange={onChange} />;
  }
);

export default InputBooleanMinimized;
