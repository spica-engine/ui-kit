import React, { memo, useState } from "react";
import styles from "./Accordion.module.scss";
import FlexElement from "@atoms/flex-element/FlexElement";
import AccordionElement from "./AccordionElement";
import {
  TypeAccordionGroup,
  TypeAccordionItem,
} from "./Accordion.types";

export type { TypeAccordionItem, TypeAccordionGroup };

const AccordionGroup: React.FC<TypeAccordionGroup> = ({
  items,
  defaultActiveIndex = 1,
  icon,
  bordered = false,
  openClassName,
  itemClassName,
  contentClassName,
  headerClassName,
  suffixOnHover,
  noBackgroundOnFocus,
  disableSuffixIcon,
  multiOpen = false,
  borderBottom = true,
  headingPadding,
  bodyPadding,
  titleSize,
  titleWeight,
  chevronSize,
  mountContent,
  gap,
  ...props
}) => {
  const [activeIndexes, setActiveIndexes] = useState<Set<number>>(() => {
    const s = new Set<number>();
    if (defaultActiveIndex) s.add(defaultActiveIndex);
    if (multiOpen) {
      items.forEach((item, i) => {
        if (item.defaultOpen) s.add(i + 1);
      });
    }
    return s;
  });

  const handleItemClick = (index: number) => {
    setActiveIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!multiOpen) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  const effectiveGap = gap !== undefined ? gap : bordered ? 8 : 0;

  return (
    <FlexElement
      direction="vertical"
      dimensionX="fill"
      gap={effectiveGap}
      {...props}
      className={`${styles.accordionGroup} ${props.className || ""}`}
    >
      {items.map((item, index) => (
        <AccordionElement
          key={index}
          title={item.title}
          isOpen={activeIndexes.has(index + 1)}
          onClick={() => handleItemClick(index + 1)}
          icon={item.icon ?? icon}
          bordered={bordered}
          openClassName={openClassName}
          itemClassName={item.className ?? itemClassName}
          contentClassName={contentClassName}
          headerClassName={headerClassName}
          suffixOnHover={suffixOnHover}
          noBackgroundOnFocus={noBackgroundOnFocus}
          disableSuffixIcon={disableSuffixIcon}
          borderBottom={item.borderBottom ?? borderBottom}
          headingPadding={item.headingPadding ?? headingPadding}
          bodyPadding={item.bodyPadding ?? bodyPadding}
          titleSize={titleSize}
          titleWeight={titleWeight}
          chevronSize={chevronSize}
          mountContent={mountContent}
          disabled={item.disabled}
        >
          {item.content}
        </AccordionElement>
      ))}
    </FlexElement>
  );
};

export default memo(AccordionGroup);

