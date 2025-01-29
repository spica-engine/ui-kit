import { FC, memo } from "react";
import styles from "./Switch.module.scss";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

export type TypeSwitch = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: TypeFlexElement;
  onChange?: (checked: boolean) => void;
};

const Switch: FC<TypeSwitch> = ({ checked, disabled = false, containerProps, onChange }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <FlexElement {...containerProps}>
      <label className={`${styles.switch} ${disabled && styles.disabled}`}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={handleToggle} />
        <span className={styles.slider} />
      </label>
    </FlexElement>
  );
};

export default memo(Switch);
