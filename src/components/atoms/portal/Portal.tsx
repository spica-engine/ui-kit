import React, { type ReactNode, type FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";

const portalRegistry = new Set<HTMLElement>();

export const isClickInsideAnyPortal = (target: EventTarget) => {
  return [...portalRegistry].some((el) => el.contains(target as Node));
};

export type TypePortalProps = {
  children: ReactNode;
  className?: string;
};

const Portal: FC<TypePortalProps> = ({ children, className }) => {
  const portalElRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = portalElRef.current;
    if (el) portalRegistry.add(el.firstChild as HTMLElement);
    return () => {
      if (el) portalRegistry.delete(el);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return ReactDOM.createPortal(
    <div ref={portalElRef} className={`${styles.container} ${className || ""}`}>
      {children}
    </div>,
    document.body
  );
};

export default Portal;
