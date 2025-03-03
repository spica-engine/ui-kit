import React, { FC } from "react";
import styles from "./Backdrop.module.scss";

type TypeBackdrop = {
  className?: string;
  children?: React.ReactNode;
  showBackdrop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Backdrop: FC<TypeBackdrop> = ({ className, children, showBackdrop = true, ...props }) => {
  return (
    <div
      {...props}
      className={`${styles.container} ${className} ${showBackdrop ? styles.showBackdrop : ""}`}
    >
      {children}
    </div>
  );
};

export default Backdrop;
