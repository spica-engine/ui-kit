import React, { FC, memo } from "react";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./Chip.module.scss";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import { IconName } from "@utils/iconList";

type TypeChip = {
  label?: string;
  variant?: "outlined" | "filled";
  icon?: IconName;
  onDelete?: () => void;
  suffixIcon?: IconName;
  suffixOnClick?: () => void;
  onClick?: () => void;
} & TypeFluidContainer;

const Chip: FC<TypeChip> = ({
  label,
  variant = "filled",
  icon,
  onDelete,
  suffixIcon,
  suffixOnClick,
  onClick,
  ...props
}) => {
  return (
    <FluidContainer
      dimensionX="hug"
      gap={8}
      prefix={{
        dimensionX: "hug",
        children: icon ? <Icon name={icon} /> : undefined,
        ...props.prefix,
      }}
      root={{
        children: label,
        ...props.root,
      }}
      suffix={
        (suffixIcon || onDelete) && {
          dimensionX: "hug",
          alignment: "center",
          children: (
            <Button
              className={styles.closeButton}
              shape="circle"
              color="transparent"
              onClick={suffixIcon ? suffixOnClick : onDelete}
            >
              <Icon name={suffixIcon || "close"} />
            </Button>
          ),
          ...props.suffix,
        }
      }
      onClick={onClick}
      {...props}
      className={`${props.className} ${styles.chip} ${styles[variant]} ${!onDelete && !suffixIcon ? styles.noButton : ""}`}
    />
  );
};

export default memo(Chip);
