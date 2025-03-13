import FlexElement from "@atoms/flex-element/FlexElement";
import { FC, memo } from "react";
import styles from "./SortPopoverContent.module.scss";
import ListItem from "@atoms/list-item/ListItem";

export type TypeSortProp = "name_desc" | "name_asc" | "date_desc" | "date_asc";

type TypeSortPopoverContent = {
  onClick?: (prop: TypeSortProp) => void;
};

const sortProps: { label: string; key: TypeSortProp }[] = [
  {
    label: "Name (Descending)",
    key: "name_desc",
  },
  {
    label: "Name (Ascending)",
    key: "name_asc",
  },
  {
    label: "Date (Descending)",
    key: "date_desc",
  },
  {
    label: "Date (Ascending)",
    key: "date_asc",
  },
];

const SortPopoverContent: FC<TypeSortPopoverContent> = ({ onClick }) => {
  const handleClick = (prop: TypeSortProp) => {
    onClick?.(prop);
  };

  return (
    <FlexElement className={styles.container} direction="vertical" alignment="leftCenter">
      {sortProps.map((el) => (
        <ListItem key={el.key} label={el.label} onClick={() => handleClick(el.key)} />
      ))}
    </FlexElement>
  );
};

export default memo(SortPopoverContent);
