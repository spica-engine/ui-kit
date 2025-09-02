import React, { type ReactNode, type FC, useEffect, useRef, useId } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";
import { useOnClickOutside } from "index.export";

const portalRegistry = new Map<string, number>();

export type TypePortalProps = {
  children: ReactNode;
  className?: string;
  onClickOutside?: (event?: MouseEvent) => void;
};

const Portal: FC<TypePortalProps> = ({ children, className, onClickOutside }) => {
  const id = useId();
  const portalElRef = useRef<HTMLDivElement | null>(null);
  const portalCreationTime = useRef(Date.now());

  useOnClickOutside({
    targetElements: [portalElRef.current?.firstChild as HTMLElement],
    onClickOutside: (event) => {
      const record = portalRegistry.get(id);
      if (record !== Math.max(...portalRegistry.values())) return;
      onClickOutside?.(event);
    },
  });

  useEffect(() => {
    portalRegistry.set(id, portalCreationTime.current);
    return () => {
      portalRegistry.delete(id);
    };
  }, [id]);

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
