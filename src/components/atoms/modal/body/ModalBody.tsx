import React, { FC, memo } from "react";
import styles from "./ModalBody.module.scss";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";

type TypeModalBody = {
  className?: string;
} & TypeFlexElement;

const ModalBody: FC<TypeModalBody> = ({ className, children, ...props }) => {
  return (
    <FlexElement
      className={`${styles.modalBody} ${className}`}
      {...{ alignment: "top", dimensionX: "fill", dimensionY: "fill", ...props }}
      children={children}
    />
  );
};

export default memo(ModalBody);
