import { TypeFluidContainer } from 'components/atoms/fluid-container/FluidContainer';
import React, { FC, memo, useRef, useState } from 'react'
import styles from './Modal.module.scss'
import FlexElement from '../flex-element/FlexElement';
import ModalHeader from './header/ModalHeader';
import ModalBody from './body/ModalBody';
import ModalFooter from './footer/ModalFooter';
import Button from '../button/Button';
import Icon from '../icon/Icon';

type TypeModal = {
    className?: string;
    animation?: 'leftToMiddle' | 'rightToMiddle' | 'topToBottom' | 'bottomToTop' | 'growFromCenter' | 'zoomIn';
    showCloseButton?: boolean;
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    children: React.ReactNode;
    onClose?: () => void;
} & TypeFluidContainer;

const ModalComponent: FC<TypeModal> = ({
    className,
    animation = 'growFromCenter',
    showCloseButton = true,
    showBackdrop = true,
    closeOnBackdropClick = false,
    children,
    onClose,
    ...props
}) => {

    const [isVisible, setIsVisible] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (closeOnBackdropClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleClose();
        }
    };

    if (!isVisible) return null;


    return (
        <>
            {showBackdrop && <div className={styles.modalBackdrop} onClick={handleOutsideClick} />}
            <FlexElement
                className={`${styles.modalContainer} ${styles[animation]}`}
                alignment='top'
                direction='vertical'
                ref={modalRef}
                {...props}
            >
                {showCloseButton && (
                    <Button
                        className={styles.closeButton}
                        onClick={handleClose}
                        children={
                            <Icon name='close' />
                        }
                        color='transparent'
                    />
                )}
                {children}
            </FlexElement>
        </>
    );
}

const Modal = memo(ModalComponent) as unknown as FC<TypeModal> & {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Footer: typeof ModalFooter;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal