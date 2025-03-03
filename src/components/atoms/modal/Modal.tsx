import { TypeFluidContainer } from "../../../components/atoms/fluid-container/FluidContainer";
import React, { FC, useRef, useState, useEffect, memo } from "react";
import styles from "./Modal.module.scss";
import FlexElement from "../flex-element/FlexElement";
import ModalHeader from "./header/ModalHeader";
import ModalBody from "./body/ModalBody";
import ModalFooter from "./footer/ModalFooter";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import { useOnClickOutside } from "../../../custom-hooks/useOnClickOutside";
import Backdrop from "../backdrop/Backdrop";
import Portal from "../portal/Portal";


type TypeModal = {
  className?: string;
  animation?: "growFromCenter" | "zoomIn";
  showCloseButton?: boolean;
  disableClose?: boolean;
  overflow?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  showBackdrop?: boolean;
  backdropType?: "static" | "default";
  backdropClassName?: string;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
  isOpen?: boolean;
} & TypeFluidContainer;

const ModalComponent: FC<TypeModal> = ({
  className,
  animation = "growFromCenter",
  showCloseButton = true,
  disableClose = false,
  overflow = true,
  children,
  onClose,
  showBackdrop = true,
  backdropType = "default",
  backdropClassName,
  backdropProps,
  isOpen = false,
  ...props
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

  return (
    <Portal>
      <FlexElement className={styles.modalContainer}>
        <Backdrop
          showBackdrop={showBackdrop}
          {...backdropProps}
          className={backdropClassName}
          onClick={handleClickOutside}
        />
        <FlexElement
          alignment="top"
          direction="vertical"
          {...props}
          className={`${styles.modalContent} ${animationController ? "" : styles[animation]} ${!overflow ? styles.noOverflow : ""} ${isShaking ? styles.shake : ""} `}
        >
          {showCloseButton && (
            <Button
              className={styles.closeButton}
              onClick={handleClose}
              children={<Icon name="close" />}
              variant="icon"
            />
          )}
          {children}
        </FlexElement>
      </FlexElement>
    </Portal>
  );
};

const Modal = memo(ModalComponent) as unknown as FC<TypeModal> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
