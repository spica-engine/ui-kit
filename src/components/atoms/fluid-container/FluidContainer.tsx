import { FC, memo } from "react";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";

export type FluidContainerProps = {
  prefix?: FlexElementProps;
  root?: FlexElementProps;
  suffix?: FlexElementProps;
  className?: string;
} & FlexElementProps;

const FluidContainer: FC<FluidContainerProps> = memo(({ prefix, root, suffix, ...props }) => {
  return (
    <FlexElement {...props}>
      <>
        {prefix?.children && <FlexElement {...prefix} />}
        {root?.children && <FlexElement {...root} />}
        {suffix?.children && <FlexElement {...suffix} />}
      </>
    </FlexElement>
  );
});

export default FluidContainer;
