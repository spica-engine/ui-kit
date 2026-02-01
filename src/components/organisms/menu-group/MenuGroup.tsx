import React, { FC, memo } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import styles from "./MenuGroup.module.scss";

type TypeMenuGroup = {
  options?: Record<
    string,
    {
      label?: string;
      value?: React.ReactNode;
      className?: string;
    } & Partial<TypeFlexElement>
  >;
  showDivider?: boolean;
} & TypeFlexElement;

const MenuGroup: FC<TypeMenuGroup> = ({
  options = {},
  showDivider = true,
  className,
  ...props
}) => {
  return (
    <FlexElement
      dimensionX={160}
      direction="vertical"
      gap={0}
      alignment="leftCenter"
      className={`${styles.container} ${className || ""}`}
      {...props}
    >
      {Object.entries(options).map(([key, option], index, array) => {
        const { label, value, className, ...flexProps } = option;
        return (
          <FlexElement
            key={key}
            dimensionX={"fill"}
            direction="vertical"
            gap={10}
            alignment="leftCenter"
            {...flexProps}
            className={`${styles.menuSection} ${!showDivider || index === array.length - 1 ? styles.noDivider : ""} ${option.className || ""}`}
          >
            {label && <Text className={styles.label}>{label}</Text>}
            {value}
          </FlexElement>
        );
      })}
    </FlexElement>
  );
};

export default memo(MenuGroup);
