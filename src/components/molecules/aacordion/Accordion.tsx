import React, { useEffect, useState } from "react";
import styles from "./Accordion.module.scss";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";

type AccordionItemProps = TypeFlexElement & {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isOpen: boolean;
  header?: TypeFluidContainer;
  bordered?: boolean;
  openClassName?: string;
  onClick: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
  icon,
  header,
  bordered = false,
  openClassName,
  ...props
}) => {
  return (
    <FlexElement
      dimensionX="fill"
      direction="vertical"
      alignment="leftCenter"
      gap={0}
      {...props}
      className={`${styles.accordionItem} ${bordered ? styles.bordered : ""} ${
        props.className || ""
      }`}
    >
      <FluidContainer
        dimensionX="fill"
        mode="fill"
        root={{
          children: title,
          alignment: "leftCenter",
        }}
        suffix={{
          children: icon || header?.suffix?.children || (
            <Icon name="chevronDown" className={`${styles.icon} ${isOpen ? styles.rotate : ""}`} />
          ),
          ...header?.suffix,
        }}
        {...header}
        onClick={onClick}
        className={`${styles.accordionTitle} ${isOpen ? openClassName || styles.open : ""} ${
          header?.className || ""
        }`}
      />

      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}>
        <div className={styles.accordionContentInner}>{children}</div>
      </div>
    </FlexElement>
  );
};

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

type AccordionGroupProps = TypeFlexElement & {
  items: AccordionItem[];
  defaultActiveIndex?: number;
  icon?: React.ReactNode;
  bordered?: boolean;
  header?: TypeFluidContainer;
  openClassName?: string;
};

const AccordionGroup: React.FC<AccordionGroupProps> = ({
  items,
  defaultActiveIndex = 1,
  icon,
  bordered = false,
  header,
  openClassName,
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
        <AccordionItem
          key={index + 1}
          title={item.title}
          isOpen={activeIndex === index + 1}
          onClick={() => handleItemClick(index + 1)}
          icon={item.icon || icon}
          bordered={bordered}
          header={header}
          openClassName={openClassName}
        >
          {item.content}
        </AccordionItem>
      ))}
    </FlexElement>
  );
};

export default AccordionGroup;
