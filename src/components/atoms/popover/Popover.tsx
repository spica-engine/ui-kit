import {
  FC,
  memo,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Popover.module.scss";
import useAdaptivePosition, { Placement } from "@custom-hooks/useAdaptivePosition";
import { useOnClickOutside } from "@custom-hooks/useOnClickOutside";
import useKeyDown from "@custom-hooks/useKeyDown";
import Portal from "../portal/Portal";

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
    refs: [containerRef, popoverRef],
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
      {...containerProps}
      ref={containerRef}
      {...handleInteraction}
      className={`${styles.container} ${containerProps?.className || ""}`}
    >
      <FlexElement ref={childrenRef}>{children}</FlexElement>
      {isOpen && (
        <Portal className={portalClassName}>
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
