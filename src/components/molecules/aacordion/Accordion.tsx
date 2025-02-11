import React, { useEffect, useState } from "react";
import styles from "./Accordion.module.scss";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import { IconName } from "utils/iconList";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode | IconName;
  isOpen: boolean;
  bordered?: boolean;
  openClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  onClick: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
  icon,
  bordered = false,
  openClassName,
  itemClassName,
  contentClassName,
  headerClassName,
}) => {
  const renderIcon = () => {
    if (icon && typeof icon !== "string") {
      return icon;
    }
    const iconName = icon || "chevronDown";
    return (
      <Icon
        name={iconName as IconName}
        className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
      />
    );
  };

  return (
    <div
      className={`${styles.accordionItem} ${bordered ? styles.bordered : ""} ${
        itemClassName || ""
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
          children: renderIcon(),
        }}
        onClick={onClick}
        className={`${styles.accordionTitle} ${isOpen ? openClassName || styles.open : ""} ${
          headerClassName || ""
        }`}
      />

      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""} ${
          contentClassName || ""
        }`}
      >
        <div className={styles.accordionContentInner}>{children}</div>
      </div>
    </div>
  );
};

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
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
          openClassName={openClassName}
        >
          {item.content}
        </AccordionItem>
      ))}
    </FlexElement>
  );
};

export default AccordionGroup;
