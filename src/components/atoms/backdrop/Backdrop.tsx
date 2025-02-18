import React, { FC } from "react";
import styles from "./Backdrop.module.scss";

type TypeBackdrop = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Backdrop: FC<TypeBackdrop> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};

export default Backdrop;
