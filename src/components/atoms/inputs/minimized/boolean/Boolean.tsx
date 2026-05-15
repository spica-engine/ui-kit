import { FC, memo } from "react";
import styles from "./Boolean.module.scss";

export type TypeInputBooleanMinimized = {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const InputBooleanMinimized: FC<TypeInputBooleanMinimized> = ({
  checked,
  disabled = false,
  onChange,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <span
      className={`${styles.bool} ${checked ? styles.boolTrue : styles.boolFalse} ${disabled ? styles.disabled : ""}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !disabled && onChange) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      {checked ? "true" : "false"}
    </span>
  );
};


export default memo(InputBooleanMinimized);
