import { memo, forwardRef } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

export type TypeFluidContainer = {
  prefix?: TypeFlexElement;
  root?: TypeFlexElement;
  suffix?: TypeFlexElement;
} & TypeFlexElement;

const FluidContainer = forwardRef<HTMLDivElement, TypeFluidContainer>(
  ({ prefix, root, suffix, ...props }, ref) => {
    return (
      <FlexElement {...props} ref={ref}>
        <>
          {prefix?.children && <FlexElement {...prefix} />}
          {root?.children && <FlexElement {...root} />}
          {suffix?.children && <FlexElement {...suffix} />}
        </>
      </FlexElement>
    );
  }
);

export default memo(FluidContainer);
