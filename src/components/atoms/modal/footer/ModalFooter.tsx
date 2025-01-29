import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import React, { FC, memo } from "react";
import styles from "./ModalFooter.module.scss";

type TypeModalFooter = {
  className?: string;
} & TypeFluidContainer;

const ModalFooter: FC<TypeModalFooter> = ({ className, prefix, root, suffix, ...props }) => {
  return (
    <FluidContainer
      className={`${styles.modalFooter} ${className}`}
      {...{ alignment: "leftCenter", dimensionX: "fill", dimensionY: "hug", ...props }}
      prefix={{
        children: prefix?.children,
        ...{ dimensionX: "hug", alignment: "leftCenter", ...prefix },
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
  );
};

export default memo(ModalFooter);
