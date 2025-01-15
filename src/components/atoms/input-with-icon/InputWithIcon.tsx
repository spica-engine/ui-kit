import React, { FC, ReactElement } from "react";
import FluidContainer, { FluidContainerProps } from "../fluid-container/FluidContainer";
import styles from "./InputWithIcon.module.scss";


type TypeInputWithIcon = {
  className?: string;
} & FluidContainerProps;

const InputWithIcon: FC<TypeInputWithIcon> = ({
  className,
  ...props
}) => {
  return <FluidContainer 
    className={`${styles.container} ${className}`}   
    {...props}
  />;
};

export default InputWithIcon;
