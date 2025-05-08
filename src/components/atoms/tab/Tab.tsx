import React, { FC, memo, useEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./Tab.module.scss";

type TypeTab = {
  type?: "default" | "underline" | "window";
  items: TypeFluidContainer[];
  indicatorClassName?: string;
} & TypeFlexElement;

const Tab: FC<TypeTab> = ({ type = "default", items, indicatorClassName, ...props }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    setItemWidth((containerRef.current?.offsetWidth || 1) / items.length);
  }, [items]);

  return (
    <FlexElement
      ref={containerRef}
      dimensionX="fill"
      gap={type == "window" ? 0 : 5}
      {...props}
      className={`${styles.container} ${styles[type]} ${props.className}`}
    >
      {type !== "window" ? (
        <div
          className={`${styles.indicator} ${indicatorClassName}`}
          style={{
            width: itemWidth - 2,
            left: activeIndex * itemWidth,
          }}
        />
      ) : undefined}

      {items.map((item, index) => {
        return (
          <FluidContainer
            key={index}
            ref={item.ref}
            dimensionX="fill"
            dimensionY="fill"
            mode="middle"
            prefix={{
              children: item.prefix?.children,
              ...item.prefix,
              className: `${item.prefix?.className}`,
            }}
            root={{
              children: item.root?.children,
              ...item.root,
              className: `${styles.root} ${item.root?.className}`,
            }}
            suffix={{
              children: item.suffix?.children,
              ...item.suffix,
              className: `${item.suffix?.className}`,
            }}
            onClick={() => handleItemClick(index)}
            {...item}
            className={`${styles.item} ${styles[type]} ${index === activeIndex ? styles.active : ""}`}
          />
        );
      })}
    </FlexElement>
  );
};

export default memo(Tab);
