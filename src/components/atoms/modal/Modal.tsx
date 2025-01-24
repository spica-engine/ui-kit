import { TypeFluidContainer } from 'components/atoms/fluid-container/FluidContainer';
import React, { FC, memo, useState } from 'react'
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
    children: React.ReactNode;
    onClose?: () => void;
} & TypeFluidContainer;

const ModalComponent: FC<TypeModal> = ({
    className,
    animation = 'growFromCenter',
    showCloseButton = true,
    children,
    onClose,
    ...props
}) => {

    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;


    return (
        <>
            <div className={styles.modalBackdrop} />
            <FlexElement
                className={`${styles.modalContainer} ${styles[animation]}`}
                alignment='top'
                direction='vertical'
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