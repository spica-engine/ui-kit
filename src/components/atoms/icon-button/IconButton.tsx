import { ButtonHTMLAttributes, FC } from "react";
import styles from "./IconButton.module.scss";
import Icon from "../icon/Icon";
import { IconName } from "utils/iconList";
import { TypeFlexElement } from "../flex-element/FlexElement";

type TypeIconButton = {
  variant?: "base" | "default" | "danger" | "dangerOutline" | "dangerBase";
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon: IconName;
  iconProps?: TypeFlexElement;
};

const IconButton: FC<TypeIconButton> = ({ variant = "default", buttonProps, icon, iconProps }) => {
  const variants = {
    base: styles.base,
    default: styles.default,
    danger: styles.danger,
    dangerOutline: styles.dangerOutline,
    dangerBase: styles.dangerBase,
  };

  return (
    <button {...buttonProps} className={`${variants[variant]} ${buttonProps?.className}`}>
      <Icon name={icon} {...iconProps} />
    </button>
  );
};

export default IconButton;
