import { FC, memo } from "react";
import styles from "./Boolean.module.scss";
import Text from "@atoms/text/Text";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import { IconName } from "@utils/iconList";

export type TypeBooleanInput = {
  checked?: boolean;
  label?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  description?: string;
  onChange?: (checked: boolean) => void;
  iconName?: IconName;
  className?: string;
};

const BooleanInput: FC<TypeBooleanInput & TypeFlexElement> = ({
  checked = false,
  disabled = false,
  label,
  hideLabel = false,
  description,
  onChange,
  iconName = "fieldBoolean" as IconName,
  className,
  ...props
}) => {
  const handleToggle = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <FlexElement
      direction="vertical"
      alignment="leftTop"
      dimensionX="fill"
      {...props}
      className={`${styles.field} ${className ?? ""}`}
    >
      {label && (
        <div className={styles.fieldHead}>
          <div className={styles.fieldName}>
            <Icon className={styles.icon} name={iconName} />
            <span>{label}</span>
          </div>
          <span className={styles.fieldType}>boolean</span>
        </div>
      )}
      <div className={styles.toggleRow}>
        <div
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`${styles.toggle} ${checked ? styles.toggleOn : ""} ${disabled ? styles.toggleDisabled : ""}`}
        />
        <span className={styles.toggleLabel}>{!hideLabel && (checked ? "true" : "false")}</span>
      </div>
      {description && (
        <Text size="xsmall" variant="secondary" className={styles.description}>
          {description}
        </Text>
      )}
    </FlexElement>
  );
};

export default memo(BooleanInput);
