import { FC, memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Popover.module.scss";
import useAdaptivePosition, { Placement } from "custom-hooks/useAdaptivePosition";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import useKeyDown from "custom-hooks/useKeyDown";

type TypePopover = {
  placement?: Placement;
  content: ReactNode;
  children?: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  containerProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
};

const Popover: FC<TypePopover> = ({
  placement = "bottom",
  content,
  trigger = "click",
  children,
  open,
  containerProps,
  contentProps,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  useKeyDown("Escape", () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

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
    <FlexElement
      ref={containerRef}
      {...handleInteraction}
      {...containerProps}
      className={styles.container}
    >
      <FlexElement ref={childrenRef} {...containerProps}>
        {children}
      </FlexElement>
      {isOpen && (
        <FlexElement
          ref={popoverRef}
          style={{ ...targetPosition }}
          {...contentProps}
          className={`${contentProps?.className} ${styles.content}`}
        >
          {content}
        </FlexElement>
      )}
    </FlexElement>
  );
};

export default memo(Popover);
