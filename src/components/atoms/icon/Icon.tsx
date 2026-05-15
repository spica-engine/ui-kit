import React, { CSSProperties, memo } from "react";
import styles from "./Icon.module.scss";
import { iconMap, IconName, IconSize } from "@utils/iconList";

export type TypeIcon = {
  name: IconName;
  className?: string;
  size?: IconSize;
  color?: string;
};

const Icon: React.FC<TypeIcon> = ({ name, className, size = "md", color }) => {
  const IconItem = iconMap[name] ?? iconMap["help"];
  const style: CSSProperties | undefined =
    typeof size === "number" || color
      ? {
          ...(typeof size === "number" && { width: size, height: size }),
          ...(color && { color }),
        }
      : undefined;
  return (
    <IconItem
      className={`${styles.icon} ${typeof size !== "number" && styles[size]} ${className}`}
      style={style}
    />
  );
};

export default memo(Icon);
