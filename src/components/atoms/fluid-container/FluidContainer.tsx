import { memo, forwardRef } from "react";
import FlexElement, { TypeDimension, TypeFlexElement } from "../flex-element/FlexElement";

export type TypeFluidContainer = {
  prefix?: TypeFlexElement;
  root?: TypeFlexElement;
  suffix?: TypeFlexElement;
  mode?: "hug" | "fill" | "middle";
} & TypeFlexElement;

const FluidContainer = forwardRef<HTMLDivElement, TypeFluidContainer>(
  ({ prefix, root, suffix, mode = "hug", alignment, ...props }, ref) => {
    const getDimensionX = (element: TypeFlexElement | undefined, defaultMode: TypeDimension) =>
      element?.dimensionX || defaultMode;

    const prefixDimensionX = getDimensionX(prefix, "hug");
    const rootDimensionX = getDimensionX(root, mode === "fill" ? "fill" : "hug");
    const suffixDimensionX = getDimensionX(suffix, "hug");

    const containerAlignment = alignment || (mode === "middle" ? "center" : "leftCenter");

    const renderFlexElement = (element: TypeFlexElement | undefined, dimensionX: TypeDimension) =>
      element?.children ? <FlexElement {...element} dimensionX={dimensionX} /> : null;

    return (
      <FlexElement {...props} ref={ref} alignment={containerAlignment}>
        {renderFlexElement(prefix, prefixDimensionX)}
        {renderFlexElement(root, rootDimensionX)}
        {renderFlexElement(suffix, suffixDimensionX)}
      </FlexElement>
    );
  }
);

export default memo(FluidContainer);
