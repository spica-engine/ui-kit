import React, { memo, CSSProperties, ReactNode, RefObject, FC } from "react";
import styles from "./FlexElement.module.scss";

export type TypeDimension = number | "fill" | "hug";

export type TypeFlexElement = {
  children?: ReactNode;
  alignment?:
    | "leftTop"
    | "top"
    | "rightTop"
    | "leftCenter"
    | "center"
    | "rightCenter"
    | "leftBottom"
    | "bottom"
    | "rightBottom";
  direction?: "vertical" | "horizontal" | "wrap";
  dimensionX?: TypeDimension;
  dimensionY?: TypeDimension;
  gap?: number;
  className?: string;
  style?: CSSProperties;
  ref?: RefObject<HTMLDivElement | null>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

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
  const alignmentClass = styles[alignment];
  const directionClass = styles[direction === "vertical" ? "vertical" : "horizontal"];
  const wrapClass = styles[direction === "wrap" ? "wrap" : "noWrap"];
  const dimensionClassX = typeof dimensionX === "number" ? "" : styles[`dimensionX${dimensionX}`];
  const dimensionClassY = typeof dimensionY === "number" ? "" : styles[`dimensionY${dimensionY}`];

  const inlineStyles = {
    gap: `${gap}px`,
    width: typeof dimensionX === "number" ? `${dimensionX}px` : undefined,
    height: typeof dimensionY === "number" ? `${dimensionY}px` : undefined,
  };

  if (!children) return null;

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ ...style, ...inlineStyles }}
      className={`${className} ${styles.flexElement} ${alignmentClass} ${directionClass} ${wrapClass} ${dimensionClassX} ${dimensionClassY}`}
    >
      {children}
    </div>
  );
};

export default memo(FlexElement);
