import { FC, memo } from "react";
import styles from "./DropList.module.scss";
import FlexElement from "../flex-element/FlexElement";
import Button from "../button/Button";

type TypeDropList = {
  active?: number;
  length?: number;
  maxItems?: number;
  onCreate?: () => void;
  onChange?: (index: number) => void;
};

const DropList: FC<TypeDropList> = ({ active = 0, length = 0, maxItems, onChange, onCreate }) => {
  const handleClickItem = (index: number) => {
    onChange?.(index);
  };

  const handleClickCreate = () => {
    if (maxItems === length) {
      return;
    }
    onCreate?.();
  };

  return (
    <FlexElement className={styles.container} dimensionX="fill" alignment="leftCenter">
      {new Array(length).fill(0).map((el, index) => (
        <Button
          key={index}
          color="transparent"
          variant="filled"
          keepWidth={false}
          onClick={() => handleClickItem(index)}
          className={active === index && styles.active}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        color="transparent"
        variant="filled"
        onClick={handleClickCreate}
        disabled={maxItems === length}
      >
        +
      </Button>
    </FlexElement>
  );
};

export default memo(DropList);
