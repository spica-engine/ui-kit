import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";
import React, { FC, memo, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import FlexElement from "../flex-element/FlexElement";
import ModalHeader from "./header/ModalHeader";
import ModalBody from "./body/ModalBody";
import ModalFooter from "./footer/ModalFooter";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

type TypeModal = {
  className?: string;
  animation?:
    | "leftToMiddle"
    | "rightToMiddle"
    | "topToBottom"
    | "bottomToTop"
    | "growFromCenter"
    | "zoomIn";
  showCloseButton?: boolean;
  disableClose?: boolean;
  overflow?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
} & TypeFluidContainer;

const ModalComponent: FC<TypeModal> = ({
  className,
  animation = "growFromCenter",
  showCloseButton = true,
  disableClose = false,
  overflow = true,
  children,
  onClose,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({
    refs: [modalRef],
    onClickOutside: () => {
      handleClose();
    },
  });

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <FlexElement className={`${styles.modalBackdrop}`} dimensionX={"fill"} dimensionY={"fill"}>
      <FlexElement
        className={`${styles.modalContainer} ${styles[animation]} ${!overflow ? styles.noOverflow : ""}`}
        alignment="top"
        direction="vertical"
        {...props}
        ref={modalRef}
      >
        {showCloseButton && (
          <Button
            className={styles.closeButton}
            onClick={handleClose}
            children={<Icon name="close" />}
            color="transparent"
          />
        )}
        {children}
      </FlexElement>
    </FlexElement>
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
