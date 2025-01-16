import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import Text from "components/atoms/text/Text";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";

export type TypeInputBoolean = {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
};

const InputBoolean: FC<TypeInputBoolean> = memo(
  ({ checked, disabled = false, label, className, onChange }) => {
    const handleToggle = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <FluidContainer
        className={className}
        gap={10}
        dimensionY={36}
        root={{
          children: (
            <label className={`${styles.switch} ${disabled ? styles.disabled : ""}`}>
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={handleToggle}
              />
              <span className={styles.slider} />
            </label>
          ),
        }}
        suffix={{
          children: label && <Text>{label}</Text>,
        }}
      />
    );
  }
);

export default InputBoolean;
