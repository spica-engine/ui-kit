import React, { FC, memo, ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Text.module.scss";

export type TypeText = {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large" | "xlarge";
  className?: string;
  children: ReactNode;
} & TypeFlexElement;

const Text: FC<TypeText> = ({
  variant = "primary",
  size = "medium",
  children,
  className,
  ...props
}) => {
  const variantClass = styles[variant];
  const sizeClass = styles[size];

  return (
    <FlexElement {...props}>
      <span className={`${styles.text} ${variantClass} ${sizeClass} ${className}`}>{children}</span>
    </FlexElement>
  );
};

export default memo(Text);
