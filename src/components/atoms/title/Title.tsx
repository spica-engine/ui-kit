import React, { FC, memo, ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./Title.module.scss";

export type TypeTitle = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: string;
} & TypeFlexElement;

const Title: FC<TypeTitle> = ({ type = "h1", children, className, ...props }) => {
  return (
    <FlexElement {...props}>
      {React.createElement(type, { className: `${styles.title} ${className || ""}` }, children)}
    </FlexElement>
  );
};

export default memo(Title);
