import React, { FC, memo, RefObject, useEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./Tab.module.scss";

export type TypeTab = {
  type?: "default" | "underline" | "window";
  items: TypeFluidContainer[];
  indicatorClassName?: string;
  indicatorMode?: "equal" | "fit";
  value?: number;
} & TypeFlexElement;

const Tab: FC<TypeTab> = ({
  type = "default",
  items,
  indicatorClassName,
  indicatorMode = "equal",
  value,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!value && value !== 0) return;
    setActiveIndex(value);
  }, [value]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const widths = itemRefs.current.map(
      (el) => (el?.offsetWidth || 0) + (type === "window" ? 5 : 20)
    );
    setTabWidths(widths);
  }, [items, indicatorMode, type]);

  const indicatorWidth =
    indicatorMode === "fit" ? tabWidths[activeIndex] || 0 : tabWidths[activeIndex] - 2;

  const indicatorLeft = tabWidths.slice(0, activeIndex).reduce((a, b) => a + b - 5, 0);

  return (
    <FlexElement
      ref={containerRef}
      dimensionX="fill"
      gap={type === "window" ? 0 : 20}
      {...props}
      className={`${styles.container} ${styles[type]} ${props.className || ""}`}
    >
      {type !== "window" && (
        <div
          className={`${styles.indicator} ${indicatorClassName || ""}`}
          style={{ width: indicatorWidth, left: indicatorLeft }}
        />
      )}

      {items.map((item, index) => {
        return (
          <FluidContainer
            key={index}
            ref={
              ((el: HTMLDivElement | null) =>
                (itemRefs.current[index] = el)) as unknown as RefObject<HTMLDivElement>
            }
            dimensionX={indicatorMode === "equal" ? "fill" : "hug"}
            dimensionY="fill"
            mode="middle"
            prefix={{
              children: item.prefix?.children,
              ...item.prefix,
              className: `${item.prefix?.className || ""}`,
            }}
            root={{
              children: item.root?.children,
              ...item.root,
              className: `${styles.root} ${item.root?.className || ""}`,
            }}
            suffix={{
              children: item.suffix?.children,
              ...item.suffix,
              className: `${item.suffix?.className || ""}`,
            }}
            onClick={() => handleItemClick(index)}
            {...item}
            className={`${styles.item} ${styles[type]} ${
              index === activeIndex ? styles.active : ""
            }`}
          />
        );
      })}
    </FlexElement>
  );
};

export default memo(Tab);
