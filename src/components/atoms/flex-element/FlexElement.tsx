import { FC, memo, ReactElement } from "react";

export type FlexElementProps = {
  children?: ReactElement;
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
}

const FlexElement: FC<FlexElementProps> = memo(
  ({
    children,
    alignment = "center",
    direction = "horizontal",
    dimensionX = "hug",
    dimensionY = "hug",
    gap = 5,
    className = "",
  }) => {
    const alignmentStyles = {
      leftTop: { justifyContent: "flex-start", alignItems: "flex-start" },
      top: { justifyContent: "center", alignItems: "flex-start" },
      rightTop: { justifyContent: "flex-end", alignItems: "flex-start" },
      leftCenter: { justifyContent: "flex-start", alignItems: "center" },
      center: { justifyContent: "center", alignItems: "center" },
      rightCenter: { justifyContent: "flex-end", alignItems: "center" },
      leftBottom: { justifyContent: "flex-start", alignItems: "flex-end" },
      bottom: { justifyContent: "center", alignItems: "flex-end" },
      rightBottom: { justifyContent: "flex-end", alignItems: "flex-end" },
    };

    const dimensionMapping = {
      fill: "100%",
      hug: "max-content",
    };

    const width = typeof dimensionX === "number" ? `${dimensionX}px` : dimensionMapping[dimensionX];
    const height =
      typeof dimensionY === "number" ? `${dimensionY}px` : dimensionMapping[dimensionY];
    const flexWrap = direction === "wrap" ? "wrap" : "nowrap";
    const flexDirection = direction === "vertical" ? "column" : "row";
    const justifyContent = alignmentStyles[alignment]?.justifyContent;
    const alignItems = alignmentStyles[alignment]?.alignItems;

    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          gap: `${gap}px`,
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
        }}
        className={className}
      >
        {children}
      </div>
    );
  }
);

export default FlexElement;
