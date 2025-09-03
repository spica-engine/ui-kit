import { FC, memo, useRef, useState, useEffect } from "react";
import styles from "./DropList.module.scss";
import FlexElement from "../flex-element/FlexElement";
import Button from "../button/Button";

export type TypeDropList = {
  active?: number;
  length?: number;
  maxItems?: number;
  onCreate?: () => void;
  onChange?: (index: number) => void;
  onDelete?: (index: number) => void;
};

const DropListItem: FC<{
  activeIndex: number;
  index: number;
  onDelete: () => void;
  onClick: () => void;
}> = ({ activeIndex, index, onDelete, onClick }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current);
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding the delete button to allow interaction
    hoverTimeoutRef.current = setTimeout(() => {
      setShowDeleteButton(false);
    }, 1000);
  };

  const handleDeleteButtonInteraction = (isEntering: boolean) => {
    if (isEntering) {
      // Keep delete button visible when hovering over it
      hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current);
      setShowDeleteButton(true);
    } else {
      // Hide delete button when leaving it
      setShowDeleteButton(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <FlexElement
      alignment="center"
      gap={4}
      direction="vertical"
      className={styles.dropListItemContainer}
    >
      {showDeleteButton && (
        <Button
          color="transparent"
          variant="filled"
          keepWidth={false}
          onClick={onDelete}
          className={styles.deleteButton}
          onMouseEnter={() => handleDeleteButtonInteraction(true)}
          onMouseLeave={() => handleDeleteButtonInteraction(false)}
        >
          -
        </Button>
      )}
      <Button
        color="transparent"
        variant="filled"
        keepWidth={false}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={activeIndex === index && styles.active}
      >
        {index + 1}
      </Button>
    </FlexElement>
  );
};

const DropList: FC<TypeDropList> = ({
  active = 0,
  length = 0,
  maxItems,
  onChange,
  onCreate,
  onDelete,
}) => {
  const handleClickItem = (index: number) => onChange?.(index);
  const handleClickCreate = () => maxItems !== length && onCreate?.();
  const handleDeleteItem = (index: number) => onDelete?.(index);

  return (
    <FlexElement className={styles.container} dimensionX="fill" alignment="leftCenter">
      {new Array(length).fill(0).map((_, index) => (
        <DropListItem
          key={index}
          activeIndex={active}
          index={index}
          onDelete={() => handleDeleteItem(index)}
          onClick={() => handleClickItem(index)}
        />
      ))}
      <Button
        color="transparent"
        variant="filled"
        onClick={handleClickCreate}
        disabled={maxItems === length}
        className={styles.addButton}
      >
        +
      </Button>
    </FlexElement>
  );
};

export default memo(DropList);
