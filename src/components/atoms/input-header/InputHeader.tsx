import React, { FC, memo } from 'react'
import FluidContainer, { TypeFluidContainer } from '../fluid-container/FluidContainer'
import styles from './InputHeader.module.scss'

type TypeInputHeader = {
    className?: string;
} & TypeFluidContainer;

const InputHeader: FC<TypeInputHeader> = memo((
  { className, prefix, root, suffix, ...props }
  ) => {
    return (
        <FluidContainer 
            className= {`${styles.inputHeaderContainer} ${className}`}
            {...{ alignment:"leftCenter", dimensionX:"fill", dimensionY: 36, ...props }}
            prefix={{
                children: prefix?.children,
                ...{ dimensionX: "hug", alignment:"leftCenter", ...prefix },
            }}
            root={{
                children: root?.children,
                ...{ dimensionX: "fill", alignment: "leftCenter", ...root },
            }}
            suffix={{
                children: suffix?.children,
                ...{ dimensionX: "hug", alignment: "rightCenter", ...suffix },
            }}
        />
    )
})

export default InputHeader