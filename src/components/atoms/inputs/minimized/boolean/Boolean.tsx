import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import FlexElement, { FlexElementProps } from "components/atoms/flex-element/FlexElement";

export type TypeInputBooleanMinimized = {
  checked: boolean;
  disabled?: boolean;
  containerProps?: FlexElementProps;
  onChange?: (checked: boolean) => void;
};

const InputBooleanMinimized: FC<TypeInputBooleanMinimized> = memo(
  ({ checked, disabled = false, containerProps, onChange }) => {
    const handleToggle = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <FlexElement {...containerProps}>
        <label className={`${styles.switch} ${disabled ? styles.disabled : ""}`}>
          <input type="checkbox" checked={checked} disabled={disabled} onChange={handleToggle} />
          <span className={styles.slider} />
        </label>
      </FlexElement>
    );
  }
);

export default InputBooleanMinimized;
