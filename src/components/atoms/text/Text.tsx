import React, { FC, memo, ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Text.module.scss";

export type TypeText = {
  variant?: "primary" | "secondary" | "danger";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  textClassName?: string;
  children: ReactNode;
} & TypeFlexElement;

const Text: FC<TypeText> = ({
  variant = "primary",
  size = "medium",
  children,
  textClassName,
  ...props
}) => {
  const variantClass = styles[variant];
  const sizeClass = styles[size];

  return (
    <FlexElement {...props}>
      <span className={`${styles.text} ${variantClass} ${sizeClass} ${textClassName}`}>
        {children}
      </span>
    </FlexElement>
  );
};

export default memo(Text);
