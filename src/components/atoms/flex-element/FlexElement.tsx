import React, { memo, CSSProperties, ReactNode, RefObject, FC } from "react";
import styles from "./FlexElement.module.scss";
import { TypeFlexContainer, TypeFlexDimension } from "utils/interface";
import { useFlexStyles } from "custom-hooks/useFlexStyles";
import "../../../styles/shared/global.scss";

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
  className = "",
  style,
  ref,
  onClick,
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
      style={{ ...style, ...inlineStyles }}
      className={`${className} ${styles.flexElement} ${classes}`}
    >
      {children}
    </div>
  );
};

export default memo(FlexElement);
