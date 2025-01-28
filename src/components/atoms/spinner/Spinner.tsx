import React, { FC, memo, ReactNode } from "react";
import styles from "./Spinner.module.scss";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

type TypeSpinner = {
  size?: "small" | "medium" | "large" | "xlarge";
  color?: "primary" | "default" | "success" | "danger" | "soft";
  speed?: "fast" | "normal" | "slow";
  spinnerClassName?: string;
  spinning?: boolean;
  children?: ReactNode;
  contentProps?: TypeFlexElement;
};

const Spinner: FC<TypeSpinner & TypeFlexElement> = ({
  size = "medium",
  color = "primary",
  speed = "normal",
  spinnerClassName = "",
  spinning = true,
  children,
  contentProps,
  ...props
}) => {
  return (
    <FlexElement {...props}>
      {spinning && (
        <div
          className={`${spinnerClassName} ${styles.spinner} ${styles[color]} ${styles[size]} ${styles[speed]} ${children && styles.absolute}`}
        />
      )}
      {children && (
        <FlexElement
          {...contentProps}
          className={`${contentProps?.className} ${styles.container} ${spinning && styles.overlay}`}
        >
          {children}
        </FlexElement>
      )}
    </FlexElement>
  );
};

export default memo(Spinner);
