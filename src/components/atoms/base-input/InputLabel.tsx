import React from "react";
import styles from "./InputLabel.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text from "../text/Text";

type TypeInputLabel = {
  reverse?: boolean;
  divider?: boolean;
  dividerClassName?: string;
  isFocused?: boolean;
} & TypeFluidContainer;

const InputLabel = ({
  dividerClassName,
  reverse = false,
  divider = true,
  isFocused,
  ...props
}: TypeInputLabel) => {
  return (
    <FluidContainer
      mode="fill"
      prefix={{
        children: props.prefix?.children,
        ...props.prefix,
        className: `${props.prefix?.className}`,
      }}
      root={{
        children: props.root?.children,
        ...props.root,
        className: `${styles.title} ${props.root?.className} `,
      }}
      suffix={{
        dimensionY: "fill",
        children: divider && <div className={`${styles.divider} ${dividerClassName}`} />,
        ...props.suffix,
        className: `${props.suffix?.className}`,
      }}
      className={`${styles.container} ${reverse ? styles.reverse : ""} ${props.className} ${
        isFocused ? styles.focused : ""
      }`}
    />
  );
};

export default InputLabel;
