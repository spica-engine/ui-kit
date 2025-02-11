import styles from "./Accordion.module.scss";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import { IconName } from "utils/iconList";

export type AccordionItemProps = {
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

export default AccordionItem;
