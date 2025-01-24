import { FC, memo } from "react";
import styles from "./ListItem.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text from "../text/Text";

type TypeListItem = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

const ListItem: FC<TypeListItem & TypeFluidContainer> = ({
  label,
  active,
  disabled,
  onSelect,
  ...props
}) => {
  const handleClick = (value: string) => {
    if (disabled) return;
    onSelect?.(value);
  };

  return (
    <FluidContainer
      key={label}
      dimensionX="fill"
      dimensionY={36}
      alignment="leftCenter"
      onClick={() => handleClick(label)}
      className={`${styles.item} ${active && styles.active} ${disabled && styles.disabled}`}
      root={{
        children: (
          <Text
            dimensionX="fill"
            alignment="leftCenter"
            className={`${props.root?.className} ${styles.displayer}`}
          >
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
