import { FC, memo } from "react";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";

type FluidContainerProps = {
  prefix?: FlexElementProps;
  root?: FlexElementProps;
  suffix?: FlexElementProps;
  mode?: "fill" | "hug" | "middle";
  gap?: number;
  className?: string;
} & FlexElementProps;

const FluidContainer: FC<FluidContainerProps> = memo(
  ({ prefix, root, suffix, mode = "hug", gap = 5, className = "" }) => {
    const modeMapping = {
      fill: "100%",
      hug: "max-content",
      middle: "",
    };

    const width = modeMapping[mode];

    return (
      // <div
      //   style={{
      //     width,
      //     display: "flex",
      //     gap: `${gap}px`,
      //   }}
      //   className={className}
      // >
      <FlexElement>
        <>
          {prefix?.children && <FlexElement {...prefix} />}
          {root?.children && <FlexElement {...root} />}
          {suffix?.children && <FlexElement {...suffix} />}
        </>
      </FlexElement>
      // </div>
    );
  }
);

export default FluidContainer;
