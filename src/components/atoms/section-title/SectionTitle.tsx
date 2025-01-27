import React, { FC, memo } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./SectionTitle.module.scss";

type TypeSectionTitle = {
  className?: string;
} & TypeFluidContainer;

const SectionTitle: FC<TypeSectionTitle> = memo(({ className = "", ...props }) => {
  return (
    <FluidContainer
      {...props}
      dimensionX={"fill"}
      className={`${styles.sectionTitle} ${className}`}
    />
  );
});

export default SectionTitle;
