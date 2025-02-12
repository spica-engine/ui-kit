import React, { useEffect, useState } from "react";
import styles from "./Accordion.module.scss";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";

import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import AccordionElement from "./AccordionElement";

export type TypeAccordionItem = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

type TypeAccordionGroup = TypeFlexElement & {
  items: TypeAccordionItem[];
  defaultActiveIndex?: number;
  icon?: React.ReactNode;
  bordered?: boolean;
  header?: TypeFluidContainer;
  openClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
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
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActiveIndex || null);

  useEffect(() => {
    setActiveIndex(activeIndex || null);
  }, [activeIndex]);

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
          key={index + 1}
          title={item.title}
          isOpen={activeIndex === index + 1}
          onClick={() => handleItemClick(index + 1)}
          icon={item.icon || icon}
          bordered={bordered}
          openClassName={openClassName}
          itemClassName={itemClassName}
          contentClassName={contentClassName}
          headerClassName={headerClassName}
        >
          {item.content}
        </AccordionElement>
      ))}
    </FlexElement>
  );
};

export default AccordionGroup;
