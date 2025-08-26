import { FC, memo } from "react";
import styles from "./Switch.module.scss";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

export type TypeSwitch = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: TypeFlexElement;
  onChange?: (checked: boolean) => void;
  size?: "large" | "medium" | "small";
};

const sizeClasses = {
  large: styles.large,
  medium: styles.medium,
  small: styles.small,
};

const Switch: FC<TypeSwitch> = ({
  checked,
  disabled = false,
  containerProps,
  onChange,
  size = "medium",
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const sizeClass = sizeClasses[size];

  return (
    <FlexElement {...containerProps}>
      <label className={`${styles.switch} ${disabled && styles.disabled} ${sizeClass}`}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={handleToggle} />
        <span className={styles.slider} />
      </label>
    </FlexElement>
  );
};

export default memo(Switch);
