import React, { FC, useEffect, useRef, useState } from "react";
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
  size?: [number] | number | string | "xs" | "sm" | "md" | "lg" | "xl" | "full" | "hug";
  children?: React.ReactNode;
  className?: string;
  showBackdrop?: boolean;
  backdropType?: "static" | "default";
  backdropClassName?: string;
  backdropProps?: React.HTMLProps<HTMLDivElement>;
  showCloseButton?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
} & TypeFlexElement;

const Drawer: FC<TypeDrawer> = ({
  placement,
  size = "hug",
  children,
  showBackdrop = true,
  backdropType = "default",
  backdropClassName,
  backdropProps,
  showCloseButton = true,
  isOpen = false,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isShaking, setIsShaking] = useState(false);
  const [animationController, setIsAnimationEnded] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClickOutside = () => {
    if (backdropType !== "static") {
      handleClose();
      return;
    }

    setIsShaking(true);
    setIsAnimationEnded(false);
    setTimeout(() => {
      setIsShaking(false);
      setIsAnimationEnded(true);
    }, 400);
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const animationClassMap = {
    top: "topToBottom",
    right: "rightToMiddle",
    bottom: "bottomToTop",
    left: "leftToMiddle",
  };

  const animationClass = animationClassMap[placement];

  const isCustomSize =
    typeof size === "number" ||
    (typeof size === "string" && !drawerSizes.includes(size as DrawerSize));

  const sizeStyle = isCustomSize
    ? placement === "left" || placement === "right"
      ? { width: typeof size === "number" ? `${size}px` : size }
      : { height: typeof size === "number" ? `${size}px` : size }
    : {};

  return (
    <Portal>
      <FlexElement className={styles.drawerContainer}>
        <Backdrop
          showBackdrop={showBackdrop}
          {...backdropProps}
          className={backdropClassName}
          onClick={handleClickOutside}
        />
        <div
          className={`${styles.contentContainer} ${animationController ? "" : styles[animationClass]} ${isShaking ? styles.shake : ""} ${styles[placement]} ${isCustomSize ? "" : styles[size as keyof typeof styles]}`}
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
          <div className={styles.scrollableContent}>{children}</div>
        </div>
      </FlexElement>
    </Portal>
  );
};

export default Drawer;
