import { FC, HTMLAttributes, memo, ReactElement } from "react";
import styles from "./FlexElement.module.scss";

export type FlexElementProps = {
  children?: ReactElement | string;
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
  dimensionX?: number | "fill" | "hug";
  dimensionY?: number | "fill" | "hug";
  gap?: number;
  className?: string;
};

const FlexElement: FC<FlexElementProps & HTMLAttributes<HTMLDivElement>> = memo(
  ({
    children,
    alignment = "center",
    direction = "horizontal",
    dimensionX = "hug",
    dimensionY = "hug",
    gap = 5,
    className = "",
    ...props
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

    return (
      <div
        {...props}
        style={{...props.style, ...inlineStyles}}
        className={`${styles.flexElement} ${alignmentClass} ${directionClass} ${wrapClass} ${dimensionClassX} ${dimensionClassY} ${className}`}
      >
        {children}
      </div>
    );
  }
);

export default FlexElement;
