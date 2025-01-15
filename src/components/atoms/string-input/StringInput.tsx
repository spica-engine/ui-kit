import React, { FC, memo } from 'react'
import FluidContainer from '../fluid-container/FluidContainer'
import Icon from '../icon/Icon'
import styles from './StringInput.module.scss'

type TypeStringInput = {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

const StringInput: FC<TypeStringInput> = memo(
    ({ value, onChange, placeholder, className = "" }) => {
        return (
            <FluidContainer
                prefix={{ children: <Icon name="formatQuoteClose" />, dimensionX: 'hug', alignment: 'center' }}
                root={{
                    children: (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className={styles.input}
                        />                        
                    ),
                    dimensionX: 'fill',
                    alignment:'leftCenter',
                }}
                className={`${styles.stringInput} ${className}`}
                dimensionX= 'fill'
                alignment='leftCenter'
            />
        );
    }
    
);

export default StringInput