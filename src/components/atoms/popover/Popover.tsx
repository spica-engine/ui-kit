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
          <Backdrop
            showBackdrop={false}
            onClick={(event) =>
              trigger === "click" && handleVisibilityChange(false, event.nativeEvent)
            }
          />
          <FlexElement
            {...contentProps}
            ref={popoverRef}
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
