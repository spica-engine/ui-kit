import { FC, memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Popover.module.scss";
import useAdaptivePosition, { Placement } from "custom-hooks/useAdaptivePosition";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

type TypePopover = {
  placement: Placement;
  content: ReactNode;
  children: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  contentProps?: TypeFlexElement;
};

const Popover: FC<TypePopover> = ({
  placement,
  content,
  trigger = "click",
  children,
  open,
  contentProps,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef: childrenRef,
    targetRef: popoverRef,
    initialPlacement: placement,
  });

  useOnClickOutside({
    refs: [containerRef],
    onClickOutside: () => trigger === "click" && setIsOpen(false),
  });

  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition]);

  const handleInteraction = {
    onMouseEnter: () => trigger === "hover" && setIsOpen(true),
    onMouseLeave: () => trigger === "hover" && setIsOpen(false),
    onClick: () => trigger === "click" && setIsOpen(true),
  };

  return (
    <div ref={containerRef} {...handleInteraction}>
      <div ref={childrenRef}>{children}</div>
      {isOpen && (
        <FlexElement
          ref={popoverRef}
          style={{ ...targetPosition }}
          className={`${contentProps?.className} ${styles.container}`}
          {...contentProps}
        >
          {content}
        </FlexElement>
      )}
    </div>
  );
};

export default memo(Popover);
