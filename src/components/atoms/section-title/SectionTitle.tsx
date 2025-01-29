import React, { FC, memo } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./SectionTitle.module.scss";

const SectionTitle: FC<TypeFluidContainer> = ({ className = "", ...props }) => {
  return (
    <FluidContainer
      {...props}
      dimensionX={"fill"}
      className={`${styles.sectionTitle} ${className}`}
    />
  );
};

export default memo(SectionTitle);
