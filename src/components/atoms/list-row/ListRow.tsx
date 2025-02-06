import React, { FC, ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./ListRow.module.scss";

type ListRowProps = {
  children: ReactNode;
} & TypeFlexElement;

type ListCellProps = {
  children: ReactNode;
} & TypeFlexElement;

const ListCell: FC<ListCellProps> = ({ children, ...props }) => {
  return (
    <FlexElement dimensionX="hug" {...props} className={`${props.className}`}>
      {children}
    </FlexElement>
  );
};

const ListRow: FC<ListRowProps> & { Cell: FC<ListCellProps> } = ({ children, ...props }) => {
  return (
    <FlexElement
      dimensionX="fill"
      alignment="leftCenter"
      gap={10}
      {...props}
      className={`${props.className} ${styles.rowContainer}`}
    >
      {children}
    </FlexElement>
  );
};

ListRow.Cell = ListCell;

export default ListRow;
