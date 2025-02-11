import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import React, { FC, memo } from "react";
import styles from "./MenuGroup.module.scss";

type TypeMenuGroup = {
  children: React.ReactNode;
} & TypeFlexElement;

const MenuGroup: FC<TypeMenuGroup> = ({ children, ...props }) => {
  return (
    <FlexElement
      dimensionX={160}
      gap={0}
      direction="vertical"
      alignment="center"
      {...props}
      className={`${styles.container} ${props.className}`}
    >
      {children}
    </FlexElement>
  );
};

export default memo(MenuGroup);
