import React, { FC, ReactElement } from "react";
import styles from "./Button.module.scss";

type TypeButton = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps {
  children: ReactElement | string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "danger" | "link";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps & TypeButton> = ({
  children,
  className,
  disabled,
  loading,
  fullWidth,
  variant = "primary",
  onClick,
  ...props
}) => {
  const variants = {
    primary: styles.primary,
    danger: styles.danger,
    link: styles.link,
  };

  const classNames = `
  ${styles.button}
  ${fullWidth ? styles.fullWidth : ""} 
  ${variants[variant] || ""}
  ${className}`;

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  return (
    <button disabled={disabled} className={classNames} onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
};
export default Button;
