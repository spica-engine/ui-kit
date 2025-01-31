import React, { memo } from "react";
import styles from "./Icon.module.scss";
import { iconMap, IconName, IconSize } from "../../../utils/iconList";

export type TypeIcon = {
  name: IconName;
  className?: string;
  size?: IconSize;
};

const Icon: React.FC<TypeIcon> = ({ name, className, size = "md" }) => {
  const IconItem = iconMap[name];
  return (
    <IconItem
      className={`${styles.icon} ${typeof size !== "number" && styles[size]} ${className}`}
      style={typeof size === "number" ? { width: size, height: size } : undefined}
    />
  );
};

export default memo(Icon);
