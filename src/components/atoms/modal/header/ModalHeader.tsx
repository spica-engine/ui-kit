import FluidContainer, {
  TypeFluidContainer,
} from "../../../../components/atoms/fluid-container/FluidContainer";
import React, { FC, memo } from "react";
import styles from "./ModalHeader.module.scss";

type TypeModalHeader = {
  className?: string;
} & TypeFluidContainer;

const ModalHeader: FC<TypeModalHeader> = ({ className, prefix, root, ...props }) => {
  return (
    <FluidContainer
      className={`${styles.modalHeader} ${className}`}
      {...{ alignment: "leftCenter", dimensionX: "fill", dimensionY: 36, ...props }}
      prefix={{
        children: prefix?.children,
        ...{ dimensionX: "hug", alignment: "leftCenter", ...prefix },
      }}
      root={{
        children: root?.children,
        ...{ dimensionX: "fill", alignment: "leftCenter", ...root },
      }}
    />
  );
};

export default memo(ModalHeader);
