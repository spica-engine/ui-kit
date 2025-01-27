import React, { FC, memo } from 'react'
import styles from './ModalBody.module.scss'
import FlexElement, { TypeFlexElement } from 'components/atoms/flex-element/FlexElement';

type TypeModalBody = {
    className?: string;
} & TypeFlexElement;

const ModalBody: FC<TypeModalBody> = memo((
  { className, children, ...props }
  ) => {
    return (
        <FlexElement 
            className= {`${styles.modalBody} ${className}`}
            {...{ alignment:"leftCenter", dimensionX:"fill", dimensionY: "fill", ...props }}
            children= {children}
        />
    )
})

export default ModalBody