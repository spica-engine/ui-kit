import { FC, HTMLAttributes, memo } from "react";
import styles from "./Divider.module.scss";

export type TypeDivider = {
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const Divider: FC<TypeDivider> = ({ label, className, ...props }) => {
  return (
    <div className={`${styles.divider} ${className ?? ""}`} {...props}>
      <div className={styles.line} />
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.line} />
    </div>
  );
};

export default memo(Divider);
