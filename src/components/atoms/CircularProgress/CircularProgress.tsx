import React from "react";
import styles from "./CircularProgress.module.scss";

type CircularProgressStatus = "normal" | "success" | "danger";

type CircularProgressSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
interface CircularProgressProps {
  percent?: number;
  size?: CircularProgressSize;
  strokeWidth?: number;
  showLabel?: boolean;
  status?: CircularProgressStatus;
  label?: React.ReactNode;
}

const sizeMap: { [key in CircularProgressSize]: number } = {
  xsmall: 40,
  small: 60,
  medium: 80,
  large: 100,
  xlarge: 120,
};

const CircularProgress = ({
  percent = 0,
  size = "medium",
  strokeWidth = 6,
  showLabel = true,
  status = "normal",
  label,
}: CircularProgressProps) => {
  const diameter = sizeMap[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const icon = status === "success" ? "✓" : status === "danger" ? "✕" : null;

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
        <div
          className={`${styles.centerText} ${styles[status]} ${styles[size]}`}
          style={{
            fontSize: diameter * 0.24,
          }}
        >
          {label || icon || `${Math.round(percent)}%`}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
