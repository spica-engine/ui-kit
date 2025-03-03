import { FC, HTMLAttributes, memo, RefObject } from "react";
import styles from "./Text.module.scss";
import { TypeFlexDimension } from "../../../utils/interface";
import { useFlexStyles } from "custom-hooks/useFlexStyles";

export type TypeText = {
  variant?: "primary" | "secondary" | "danger";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  ref?: RefObject<HTMLInputElement | null>;
} & HTMLAttributes<HTMLSpanElement> &
  TypeFlexDimension;

const Text: FC<TypeText> = ({
  variant = "primary",
  size = "medium",
  children,
  dimensionX,
  dimensionY,
  ref,
  ...props
}) => {
  const variantClass = styles[variant];
  const sizeClass = styles[size];

  const { classes, inlineStyles } = useFlexStyles<TypeFlexDimension>({
    dimensionX: dimensionX,
    dimensionY: dimensionY,
  });

  return (
    <span
      ref={ref}
      {...props}
      className={`${props.className} ${styles.text} ${variantClass} ${sizeClass} ${classes}`}
      style={{ ...inlineStyles, ...props.style }}
    >
      {children}
    </span>
  );
};

export default memo(Text);
