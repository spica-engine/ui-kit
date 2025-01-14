import React from "react";
import styles from "./Icon.module.scss";
import FlexElement, { FlexElementProps } from "../flex-element/FlexElement";
import { iconMap } from "../../../utils/iconList";

type TypeIcon = {
  name: string;
  className?: string;
} & FlexElementProps;

const Icon: React.FC<TypeIcon> = ({ name, className, ...props}) => {
  const IconItem = iconMap[name];
  return (
    <FlexElement {...props}>
      <IconItem className={`${styles.icon} ${className}`} />
    </FlexElement>
  );
};

export default Icon;
