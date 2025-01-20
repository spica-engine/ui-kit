import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";

type TypeButton = {
  variant?: "default" | "soft" | "primary" | "danger" | "link" | "transparent";
  fullWidth?: boolean;
  children: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  containerProps?: TypeFluidContainer;
};

const Button: FC<TypeButton> = ({
  variant = "default",
  fullWidth,
  buttonProps,
  containerProps,
  children,
}) => {
  const variants = {
    default: styles.default,
    soft: styles.soft,
    primary: styles.primary,
    danger: styles.danger,
    link: styles.link,
    transparent: styles.transparent,
  };

  return (
    <button
      {...buttonProps}
      className={`${variants[variant]} ${buttonProps?.className} ${fullWidth && styles.fullWidth}`}
    >
      <FluidContainer {...containerProps} root={{ children }} />
    </button>
  );
};

export default Button;
