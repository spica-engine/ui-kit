import React, { FC, memo } from 'react'
import FlexElement from '../flex-element/FlexElement'
import styles from './Text.module.scss'

type TypeText = {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    children: string;
    dimensionX?: 'fill' | 'hug';
    dimensionY?: 'fill' | 'hug';
};

const Text: FC<TypeText> = memo(
    ({ variant = 'primary', size = 'medium', children, dimensionX = 'hug', dimensionY = 'hug' }) => {
        const variantClass = styles[variant];
        const sizeClass = styles[size];
        const fillXClass = dimensionX === 'fill' ? styles.fill : '';
        const fillYClass = dimensionY === 'fill' ? styles.fill : '';

        return (
            <FlexElement dimensionX={dimensionX} dimensionY={dimensionY}>
                <span className={`${styles.text} ${variantClass} ${sizeClass} ${fillXClass} ${fillYClass}`}>{children}</span>
            </FlexElement>
        );
    }
);

export default Text