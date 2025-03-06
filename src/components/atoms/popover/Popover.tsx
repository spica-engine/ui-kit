import { FC, memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Popover.module.scss";
import useAdaptivePosition, { Placement } from "@custom-hooks/useAdaptivePosition";
import { useOnClickOutside } from "@custom-hooks/useOnClickOutside";
import useKeyDown from "@custom-hooks/useKeyDown";
import Portal from "../portal/Portal";

type TypePopover = {
  placement?: Placement;
  content: ReactNode;
  children?: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  containerProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
  arrow?: boolean;
  arrowPlacement?: Placement;
};

const Popover: FC<TypePopover> = ({
  placement = "bottom",
  content,
  trigger = "click",
  children,
  open,
  containerProps,
  contentProps,
  arrow = false,
  arrowPlacement,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  const arrowplc = {
    top: "bottom",
    topStart: "bottomStart",
    topEnd: "bottomEnd",
    bottom: "top",
    bottomStart: "topStart",
    bottomEnd: "topEnd",
    left: "right",
    leftStart: "rightStart",
    leftEnd: "rightEnd",
    right: "left",
    rightStart: "leftStart",
    rightEnd: "leftEnd",
  } as const;

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
    onMouseEnter: () => {
      trigger === "hover" && setIsOpen(true);
    },
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
      <FlexElement ref={childrenRef}>{children}</FlexElement>
      {isOpen && (
        <Portal>
          <FlexElement
            ref={popoverRef}
            style={{ ...targetPosition }}
            {...contentProps}
            className={`${contentProps?.className} ${styles.content}`}
          >
            {arrow && (
              <div className={`${styles.arrow} ${styles[arrowPlacement || arrowplc[placement]]}`} />
            )}
            {content}
          </FlexElement>
        </Portal>
      )}
    </FlexElement>
  );
};

export default memo(Popover);
