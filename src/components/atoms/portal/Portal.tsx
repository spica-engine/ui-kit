import React, { type ReactNode, type FC, type RefObject, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";
import { useLayer } from "../layer-manager/LayerManager";

export type TypePortalProps = {
  children: ReactNode;
  className?: string;
  onClickOutside?: (event?: MouseEvent) => void;
  additionalRefs?: RefObject<HTMLElement | null>[];
};

const Portal: FC<TypePortalProps> = ({
  children,
  className,
  onClickOutside,
  additionalRefs = [],
}) => {
  const portalElRef = useRef<HTMLDivElement | null>(null);

  useLayer(
    [portalElRef, ...additionalRefs],
    onClickOutside as ((event: MouseEvent) => void) | undefined,
    !!onClickOutside
  );

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
