import React, { ReactNode, FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";
export type TypePortalProps = {
  children: ReactNode;
};

const Portal: FC<TypePortalProps> = ({ children }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return ReactDOM.createPortal(<div className={styles.container}>{children}</div>, document.body);
};

export default Portal;
