import React, { memo, CSSProperties, ReactNode, RefObject, FC } from "react";
import styles from "./FlexElement.module.scss";
import { TypeFlexContainer, TypeFlexDimension } from "@utils/interface";
import { useFlexStyles } from "custom-hooks/useFlexStyles";

export type TypeFlexElement = {
  ref?: RefObject<HTMLDivElement | null>;
} & TypeFlexContainer &
  TypeFlexDimension &
  Omit<React.HTMLAttributes<HTMLDivElement>, "prefix" | "onChange">;

const FlexElement: FC<TypeFlexElement> = ({
  children,
  alignment = "center",
  direction = "horizontal",
  dimensionX = "hug",
  dimensionY = "hug",
  gap = 5,
  style,
  ref,
  onClick,
  ...props
}) => {
  const { classes, inlineStyles } = useFlexStyles<TypeFlexContainer & TypeFlexDimension>({
    alignment,
    direction,
    dimensionX,
    dimensionY,
    gap,
  });

  if (!children) return null;

  return (
    <div
      ref={ref}
      onClick={onClick}
      {...props}
      style={{ ...style, ...inlineStyles }}
      className={`${props.className} ${styles.flexElement} ${classes}`}
    >
      {children}
    </div>
  );
};

export default memo(FlexElement);
