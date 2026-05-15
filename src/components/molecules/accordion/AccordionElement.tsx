import React, { memo, useRef } from "react";
import styles from "./Accordion.module.scss";
import { TypeAccordionElement } from "./Accordion.types";

export type { TypeAccordionElement };

const AccordionElement: React.FC<TypeAccordionElement> = ({
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
  suffixOnHover = false,
  noBackgroundOnFocus = false,
  disableSuffixIcon = false,
  disabled = false,
  borderBottom = true,
  headingPadding,
  bodyPadding,
  titleSize,
  titleWeight,
  chevronSize = 13,
  mountContent = "always",
}) => {
  const hasBeenOpened = useRef(false);
  if (isOpen && !hasBeenOpened.current) {
    hasBeenOpened.current = true;
  }
  const shouldMount = mountContent === "always" || hasBeenOpened.current;

  const itemClass = [
    styles.item,
    bordered ? styles.bordered : borderBottom ? styles.borderBottom : "",
    disabled ? styles.disabled : "",
    itemClassName || "",
  ]
    .filter(Boolean)
    .join(" ");

  const headerClass = [
    styles.header,
    noBackgroundOnFocus ? styles.noHover : "",
    isOpen ? styles.headerOpen : "",
    isOpen ? openClassName || "" : "",
    headerClassName || "",
  ]
    .filter(Boolean)
    .join(" ");

  const chevronClass = [
    styles.chevron,
    isOpen ? styles.open : "",
    suffixOnHover ? styles.onHover : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bodyClass = [
    styles.body,
    isOpen ? styles.bodyOpen : "",
    contentClassName || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={itemClass}>
      <div
        className={headerClass}
        style={headingPadding ? { padding: headingPadding } : undefined}
        onClick={disabled ? undefined : onClick}
      >
        <div className={styles.titleRow}>
          {icon && <span className={styles.iconSlot}>{icon}</span>}
          <span
            className={styles.title}
            style={{
              ...(titleSize ? { fontSize: titleSize } : {}),
              ...(titleWeight !== undefined ? { fontWeight: titleWeight } : {}),
            }}
          >
            {title}
          </span>
        </div>

        {!disableSuffixIcon && (
          <span className={chevronClass}>
            <svg
              width={chevronSize}
              height={chevronSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        )}
      </div>

      {shouldMount && (
        <div className={bodyClass}>
          <div
            className={styles.bodyInner}
            style={bodyPadding ? { padding: bodyPadding } : undefined}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(AccordionElement);

