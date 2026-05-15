import React, { FC, useEffect, useState } from "react";
import Backdrop from "../backdrop/Backdrop";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Drawer.module.scss";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Portal from "../portal/Portal";

export const drawerSizes = ["xs", "sm", "md", "lg", "xl", "full", "hug"] as const;
export type DrawerSize = (typeof drawerSizes)[number];

export type TypeDrawer = {
  placement: "top" | "right" | "bottom" | "left";
  size?: DrawerSize | number | string;
  children?: React.ReactNode;
  showBackdrop?: boolean;
  backdropType?: "static" | "default";
  backdropClassName?: string;
  backdropProps?: React.HTMLProps<HTMLDivElement>;
  showCloseButton?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  portalClassName?: string;
  contentClassName?: string;
  scrollableContentClassName?: string;
} & TypeFlexElement;

const TRANSITION_DURATION = 220;

const Drawer: FC<TypeDrawer> = ({
  placement,
  size = "hug",
  children,
  showBackdrop = false,
  backdropType = "default",
  backdropClassName,
  backdropProps,
  showCloseButton = true,
  isOpen = false,
  onClose,
  portalClassName,
  contentClassName,
  scrollableContentClassName,
}) => {
  const [inDom, setInDom] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isShaking, setIsShaking] = useState(false);

  // Mount/unmount the element based on isOpen
  useEffect(() => {
    if (isOpen) {
      setInDom(true);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setInDom(false), TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // After element is mounted in DOM (off-screen), trigger the open transition
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!inDom) return;
    const rafId = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, [inDom]);

  const handleClickOutside = () => {
    if (backdropType !== "static") {
      handleClose();
      return;
    }

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
      setTimeout(() => setInDom(false), TRANSITION_DURATION);
    }
  };

  if (!inDom) return null;

  const isCustomSize =
    typeof size === "number" ||
    (typeof size === "string" && !drawerSizes.includes(size as DrawerSize));

  const sizeStyle = isCustomSize
    ? placement === "left" || placement === "right"
      ? { width: typeof size === "number" ? `${size}px` : size }
      : { height: typeof size === "number" ? `${size}px` : size }
    : {};

  return (
    <Portal className={portalClassName}>
      <FlexElement className={styles.drawerContainer}>
        <Backdrop
          showBackdrop={showBackdrop}
          {...backdropProps}
          className={backdropClassName}
          onClick={handleClickOutside}
        />
        <div
          className={`${styles.contentContainer} ${styles[placement]} ${isCustomSize ? "" : styles[size as keyof typeof styles]} ${isVisible ? styles.open : ""} ${isShaking ? styles.shake : ""} ${contentClassName || ""}`}
          style={sizeStyle}
        >
          {showCloseButton && (
            <Button
              className={`${styles.closeButton} ${placement === "right" ? styles.leftPosition : styles.rightPosition}`}
              onClick={handleClose}
              children={<Icon name="close" />}
              variant="icon"
            />
          )}
          <div className={`${styles.scrollableContent} ${scrollableContentClassName || ""}`}>
            {children}
          </div>
        </div>
      </FlexElement>
    </Portal>
  );
};

export default Drawer;
