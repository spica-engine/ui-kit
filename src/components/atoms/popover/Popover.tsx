import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Popover.module.scss";
import useAdaptivePosition, { Placement } from "@custom-hooks/useAdaptivePosition";
import useKeyDown from "@custom-hooks/useKeyDown";
import { useOnClickOutside } from "@custom-hooks/useOnClickOutside";
import Portal from "../portal/Portal";
import Backdrop from "@atoms/backdrop/Backdrop";

export type TypePopover = {
  placement?: Placement;
  content: ReactNode;
  children?: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  containerProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
  arrow?: boolean;
  arrowPlacement?: Placement;
  portalClassName?: string;
  onClose?: (triggerEvent?: MouseEvent) => void;
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
  portalClassName,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    contentProps?.ref ?? { current: null },
    () => popoverRef.current as HTMLDivElement
  );
  useImperativeHandle(
    containerProps?.ref ?? { current: null },
    () => containerRef.current as HTMLDivElement
  );

  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = onClose !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleVisibilityChange = useCallback(
    (newOpen: boolean, event?: MouseEvent) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      if (newOpen === false) {
        onClose?.(event);
      }
    },
    [isControlled, onClose]
  );

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
      handleVisibilityChange(false);
    }
  });

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef: childrenRef,
    targetRef: popoverRef,
    initialPlacement: placement,
  });

  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition]);

  const handleClickOutside = useCallback(
    (event?: MouseEvent) => {
      if (!isOpen || trigger !== "click" || !event?.target || !popoverRef.current) {
        return;
      }

      const target = event.target as Node;
      const allPopoverContents = document.querySelectorAll("[data-popover-content]");

      const clickedInsideOtherPopover = Array.from(allPopoverContents).some(
        (popoverContent) => popoverContent !== popoverRef.current && popoverContent.contains(target)
      );

      if (clickedInsideOtherPopover) {
        return;
      }

      // Check if click is inside a Select dropdown
      // If so, don't close the Popover - let the Select component handle its own dropdown closing
      const selectDropdowns = document.querySelectorAll("[data-select-dropdown]");
      const clickedInsideSelectDropdown = Array.from(selectDropdowns).some((dropdown) => {
        return dropdown.contains(target);
      });

      if (clickedInsideSelectDropdown) {
        return;
      }

      const visiblePopovers = Array.from(allPopoverContents).filter((el) => {
        const style = globalThis.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      const topmostPopover = visiblePopovers.at(-1);
      if (topmostPopover === popoverRef.current) {
        handleVisibilityChange(false, event);
      }
    },
    [isOpen, trigger, handleVisibilityChange]
  );

  useOnClickOutside({
    targetElements: [popoverRef, containerRef],
    onClickOutside: handleClickOutside,
  });

  const handleInteraction = {
    onMouseEnter: () => {
      trigger === "hover" && handleVisibilityChange(true);
    },
    onMouseLeave: () => trigger === "hover" && handleVisibilityChange(false),
    onClick: () => trigger === "click" && handleVisibilityChange(true),
  };

  return (
    <FlexElement
      {...containerProps}
      ref={containerRef}
      {...handleInteraction}
      className={`${styles.container} ${containerProps?.className || ""}`}
    >
      <FlexElement ref={childrenRef}>{children}</FlexElement>
      {isOpen && (
        <Portal className={portalClassName}>
          <Backdrop showBackdrop={false} />
          <FlexElement
            {...contentProps}
            ref={popoverRef}
            data-popover-content
            style={{ ...targetPosition, ...(contentProps?.style ?? {}) }}
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
