import React, { FC, memo } from 'react'
import FlexElement, { FlexElementProps } from '../flex-element/FlexElement'
import styles from './Text.module.scss'

type TypeText = {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    text: string;
};

const Text: FC<TypeText & FlexElementProps> = memo(
    ({ variant = 'primary', size = 'medium', text, ...props }) => {
        const variantClass = styles[variant];
        const sizeClass = styles[size];

        return (
            <FlexElement {...props}>
                <span className={`${styles.text} ${variantClass} ${sizeClass}`}>{text}</span>
            </FlexElement>
        );
    }
);

export default Text