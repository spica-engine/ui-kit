import React, { memo, useEffect, useState } from "react";
import styles from "./Accordion.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import AccordionElement from "./AccordionElement";

export type TypeAccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export type TypeAccordionGroup = TypeFlexElement & {
  items: TypeAccordionItem[];
  defaultActiveIndex?: number;
  icon?: React.ReactNode;
  bordered?: boolean;
  header?: TypeFluidContainer;
  openClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  suffixOnHover?: boolean;
  noBackgroundOnFocus?: boolean;
  disableSuffixIcon?: boolean;
};

const AccordionGroup: React.FC<TypeAccordionGroup> = ({
  items,
  defaultActiveIndex = 1,
  icon,
  bordered = false,
  header,
  openClassName,
  itemClassName,
  contentClassName,
  headerClassName,
  suffixOnHover,
  noBackgroundOnFocus,
  disableSuffixIcon,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActiveIndex || null);

  const handleItemClick = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <FlexElement
      direction="vertical"
      dimensionX="fill"
      gap={10}
      {...props}
      className={`${styles.accordionGroup} ${props.className || ""}`}
    >
      {items.map((item, index) => (
        <AccordionElement
          key={index}
          title={item.title}
          isOpen={activeIndex === index + 1}
          onClick={() => handleItemClick(index + 1)}
          icon={item.icon || icon}
          bordered={bordered}
          openClassName={openClassName}
          itemClassName={itemClassName}
          contentClassName={contentClassName}
          headerClassName={headerClassName}
          suffixOnHover={suffixOnHover}
          noBackgroundOnFocus={noBackgroundOnFocus}
          disableSuffixIcon={disableSuffixIcon}
        >
          {item.content}
        </AccordionElement>
      ))}
    </FlexElement>
  );
};

export default memo(AccordionGroup);
