import React, { FC, memo, ReactElement } from 'react'
import FlexElement, { FlexElementProps } from '../flex-element/FlexElement'
import styles from './Text.module.scss'

export type TypeText = {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    className?: string;
    children: ReactElement | string;
} & FlexElementProps;

const Text: FC<TypeText> = memo(
    ({ variant = 'primary', size = 'medium', children, className, ...props }) => {
        const variantClass = styles[variant];
        const sizeClass = styles[size];

        return (
            <FlexElement {...props}>
                <span className={`${styles.text} ${variantClass} ${sizeClass} ${className}`}>{children}</span>
            </FlexElement>
        );
    }
);

export default Text