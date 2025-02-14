import { FC, memo } from "react";
import styles from "./ListItem.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text from "../text/Text";

type TypeListItem = {
  label: string;
  active?: boolean;
  disabled?: boolean;
} & TypeFluidContainer;

const ListItem: FC<TypeListItem> = ({ label, active, disabled, onClick, ...props }) => {
  return (
    <FluidContainer
      key={label}
      dimensionX="fill"
      dimensionY={36}
      alignment="leftCenter"
      onClick={onClick}
      className={`${styles.item} ${active && styles.active} ${disabled && styles.disabled}`}
      root={{
        children: (
          <Text dimensionX="fill" className={`${props.root?.className} ${styles.displayer}`}>
            {label}
          </Text>
        ),
        dimensionX: "fill",
      }}
      {...props}
    />
  );
};

export default memo(ListItem);
