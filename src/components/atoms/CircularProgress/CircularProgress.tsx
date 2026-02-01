import React from "react";
import styles from "./CircularProgress.module.scss";
import Icon from "@atoms/icon/Icon";
import { IconSize } from "@utils/iconList";

type CircularProgressStatus = keyof typeof progressStatusIcon;
type CircularProgressSize = keyof typeof progressSizes;

export interface CircularProgressProps {
  percent?: number;
  size?: CircularProgressSize;
  strokeWidth?: number;
  showLabel?: boolean;
  status?: CircularProgressStatus;
  label?: React.ReactNode;
}

const progressSizes = {
  xxs: 25,
  xs: 40,
  sm: 60,
  md: 80,
  lg: 100,
  xl: 120,
};

const circularProgressIcon: { [key in CircularProgressSize]: IconSize } = {
  xxs: "xs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
};

const progressStatusIcon = {
  success: "check",
  danger: "close",
  normal: undefined,
} as const;

const CircularProgress = ({
  percent = 0,
  size = "md",
  strokeWidth = 6,
  showLabel = true,
  status = "normal",
  label,
}: CircularProgressProps) => {
  const diameter = progressSizes[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedPercent = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (normalizedPercent / 100) * circumference;
  const icon = progressStatusIcon[status];
  const iconSize = circularProgressIcon[size];

  return (
    <div className={styles.container} style={{ width: diameter, height: diameter }}>
      <svg className={styles.svg} width={diameter} height={diameter}>
        <circle
          className={styles.backgroundCircle}
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={`${styles.progressCircle} ${styles[status]}`}
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showLabel && (
        <div className={`${styles.centerText} ${styles[status]} ${styles[size]}`}>
          {label !== undefined ? (
            label
          ) : icon ? (
            <Icon name={icon} size={iconSize} />
          ) : (
            `${Math.round(normalizedPercent)}%`
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
