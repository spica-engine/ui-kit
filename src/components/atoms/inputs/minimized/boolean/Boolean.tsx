import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Switch from "@atoms/switch/Switch";

export type TypeInputBooleanMinimized = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: TypeFlexElement;
  onChange?: (checked: boolean) => void;
};

const InputBooleanMinimized: FC<TypeInputBooleanMinimized> = ({
  checked,
  disabled = false,
  containerProps,
  onChange,
}) => {
  return <Switch checked={checked} disabled={disabled} {...containerProps} onChange={onChange} />;
};

export default memo(InputBooleanMinimized);
