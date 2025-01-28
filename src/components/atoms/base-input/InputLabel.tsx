import React from "react";
import styles from "./InputLabel.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import { TypeIcon } from "../icon/Icon";
import { TypeText } from "../text/Text";

type TypeInputLabel = {
  icon?: TypeIcon;
  title?: TypeText;
  reverse?: boolean;
  divider?: boolean;
  dividerClassName?: string;
  isFocused?: boolean;
} & TypeFluidContainer;

const InputLabel = ({ icon, title, dividerClassName, isFocused, ...props }: TypeInputLabel) => {
  const labelDefaults = {
    reverse: false,
    divider: true,
    ...props,
  };

  return (
    <FluidContainer
      {...labelDefaults}
      mode="fill"
      prefix={{
        children: props.prefix?.children,
        ...props.prefix,
        className: `${props.prefix?.className}`,
      }}
      root={{
        ...props.root,
        children: props.root?.children,
        className: `${styles.title} ${props.root?.className} `,
        alignment: "leftCenter",
      }}
      suffix={{
        children: labelDefaults.divider && (
          <div className={`${styles.divider} ${dividerClassName}`} />
        ),
        dimensionY: "fill",
      }}
      className={`${styles.container} ${labelDefaults.reverse ? styles.reverse : ""} ${props.className} ${
        isFocused ? styles.focused : ""
      }`}
    />
  );
};

export default InputLabel;
