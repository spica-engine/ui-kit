import React, { FC, memo, ReactElement } from 'react'
import FlexElement, { FlexElementProps } from '../flex-element/FlexElement'
import styles from './Text.module.scss'

type TypeText = {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    children: ReactElement | string;
} & FlexElementProps;

const Text: FC<TypeText> = memo(
    ({ variant = 'primary', size = 'medium', children, ...props }) => {
        const variantClass = styles[variant];
        const sizeClass = styles[size];

        return (
            <FlexElement {...props}>
                <span className={`${styles.text} ${variantClass} ${sizeClass}`}>{children}</span>
            </FlexElement>
        );
    }
);

export default Text