import { FC, memo } from "react";
import styles from "./Switch.module.scss";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";

export type TypeSwitch = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: FlexElementProps;
  onChange?: (checked: boolean) => void;
};

const Switch: FC<TypeSwitch> = memo(({ checked, disabled = false, containerProps, onChange }) => {
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
});

export default Switch;
