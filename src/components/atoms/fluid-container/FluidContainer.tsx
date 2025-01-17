import { FC, memo } from "react";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";

export type FluidContainerProps = {
  prefix?: FlexElementProps;
  root?: FlexElementProps;
  suffix?: FlexElementProps;
} & FlexElementProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> &
  React.RefAttributes<HTMLDivElement>;

const FluidContainer: FC<FluidContainerProps> = memo(
  ({ prefix, root, suffix, ...props }) => {
    return (
      <FlexElement {...props}>
        <>
          {prefix?.children && <FlexElement {...prefix} />}
          {root?.children && <FlexElement {...root} />}
          {suffix?.children && <FlexElement {...suffix} />}
        </>
      </FlexElement>
    );
  }
);

export default FluidContainer;
