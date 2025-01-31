import { FC, memo } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./InputWithIcon.module.scss";
import Input, { TypeInput } from "../input/Input";

type TypeInputWithIcon = {
  inputProps?: TypeInput;
} & TypeFluidContainer;

const InputWithIcon: FC<TypeInputWithIcon> = ({ className, inputProps, ...props }) => {
  return (
    <FluidContainer
      ref={props.ref}
      className={`${styles.container} ${className} ${inputProps?.disabled && styles.disabled}`}
      dimensionY={36}
      root={{
        children: <Input {...inputProps} className={`${inputProps?.className} ${styles.input}`} />,
        dimensionX: "fill",
        alignment: "leftCenter",
      }}
      {...props}
    />
  );
};

export default memo(InputWithIcon);
