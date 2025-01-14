import React, { memo } from "react";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";
import styles from "./Icon.module.scss";
import { iconMap, IconName } from "../../../utils/iconList";

type TypeIcon = {
  name: IconName;
  className?: string;
} & FlexElementProps;

const Icon: React.FC<TypeIcon> = memo(({ name, className, ...props}) => {
  const IconItem = iconMap[name];
  return (
    <FlexElement {...props}>
      <IconItem className={`${styles.icon} ${className}`} />
    </FlexElement>
  );
});

export default Icon;
