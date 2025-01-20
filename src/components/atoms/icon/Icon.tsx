import React, { memo } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Icon.module.scss";
import { iconMap, IconName, IconSize } from "../../../utils/iconList";

export type TypeIcon = {
  name: IconName;
  className?: string;
  size?: IconSize;
} & TypeFlexElement;

const Icon: React.FC<TypeIcon> = memo(({ name, className, size = "md", ...props }) => {
  const IconItem = iconMap[name];
  return (
    <FlexElement {...props}>
      <IconItem className={`${styles.icon} ${styles[size]} ${className}`} />
    </FlexElement>
  );
});

export default Icon;
