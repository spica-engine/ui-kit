import React, { FC, memo } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Text from "components/atoms/text/Text";
import styles from "./MenuGroup.module.scss";

type TypeMenuGroup = {
  options?: Record<string, { label: string; value?: React.ReactNode }>;
  showDivider?: boolean;
  showTitle?: boolean;
} & TypeFlexElement;

const MenuGroup: FC<TypeMenuGroup> = ({
  options = {},
  showDivider = true,
  showTitle = true,
  ...props
}) => {
  return (
    <FlexElement
      dimensionX={160}
      direction="vertical"
      gap={0}
      alignment="leftCenter"
      className={styles.container}
      {...props}
    >
      {Object.entries(options).map(([key, option], index, array) => (
        <FlexElement
          key={key}
          dimensionX={"fill"}
          direction="vertical"
          gap={10}
          alignment="leftCenter"
          className={`${styles.menuSection} ${!showDivider || index === array.length - 1 ? styles.noDivider : ""}`}
        >
          {showTitle && <Text textClassName={styles.label}>{option.label}</Text>}
          {option.value}
        </FlexElement>
      ))}
    </FlexElement>
  );
};

export default memo(MenuGroup);
