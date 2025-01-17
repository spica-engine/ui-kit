import React, { memo, useState } from 'react'
import InputWithIcon from 'components/atoms/input-with-icon/InputWithIcon'
import styles from './StringMinimized.module.scss'
import IconButton from 'components/atoms/icon-button/IconButton';

type TypeStringMinimized = {
    value?: string;
};

const StringMinimized: React.FC<TypeStringMinimized> = memo(
    ({ value: initialValue = "" }) => {
        const [value, setValue] = useState(initialValue);

        const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
        };

        const onClearValue = () => {
            setValue("");
        };
        return (
            <InputWithIcon
                className={styles.stringMinimized}
                inputProps={{
                    value,
                    onChange: onValueChange,
                }}
                suffix={
                    {   
                        children: <IconButton
                            icon="close"
                            variant='base'
                            buttonProps={{
                                onClick: onClearValue
                            }}
                        />,
                        dimensionX: 'hug',
                        alignment: 'center',
                    }   
                }
                alignment='leftCenter'
                dimensionX='fill'
                dimensionY={36}
            />
        );
    }
);

export default StringMinimized