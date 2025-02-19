import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";
import React, { FC, useRef, useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import FlexElement from "../flex-element/FlexElement";
import ModalHeader from "./header/ModalHeader";
import ModalBody from "./body/ModalBody";
import ModalFooter from "./footer/ModalFooter";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import Backdrop from "../backdrop/Backdrop";
import { PortalProvider, usePortal } from "custom-hooks/usePortal";

type TypeModal = {
  className?: string;
  animation?: "growFromCenter" | "zoomIn";
  showCloseButton?: boolean;
  disableClose?: boolean;
  overflow?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  backdrop?: boolean | "static";
  backdropClassName?: string;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
  portalId?: string;
} & TypeFluidContainer;

const ModalComponent: FC<TypeModal> = ({
  className,
  animation = "growFromCenter",
  showCloseButton = true,
  disableClose = false,
  overflow = true,
  children,
  onClose,
  backdrop = true,
  backdropClassName,
  backdropProps,
  portalId = "modal",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [animationController, setIsAnimationEnded] = useState(false);
  const { openLayer, closeLayer } = usePortal();

  const handleClickOutside = () => {
    if (backdrop !== "static") {
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

  useOnClickOutside({ refs: [modalRef], onClickOutside: handleClickOutside });

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      closeLayer("modal");
    }

    openLayer(
      portalId,
      <>
        {backdrop && <Backdrop {...backdropProps} className={backdropClassName} />}
        <FlexElement className={styles.modalContainer}>
          <FlexElement
            alignment="top"
            direction="vertical"
            {...props}
            ref={modalRef}
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
      </>
    );

    return () => closeLayer("modal");
  }, [isVisible, isShaking]);

  return null;
};

const Modal: FC<TypeModal> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({ children, ...props }) => {
  return (
    <PortalProvider>
      <ModalComponent {...props}>{children}</ModalComponent>
    </PortalProvider>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
