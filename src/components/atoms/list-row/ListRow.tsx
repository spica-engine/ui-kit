import React, { FC, memo, ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import styles from "./ListRow.module.scss";

type TypeListRow = {
  ref?: React.Ref<HTMLDivElement>;
} & TypeFlexElement;

type TypeListRowComponent = React.FC<TypeListRow> & {
  Cell: typeof FlexElement;
};

const ListRowComponent: FC<TypeListRow> = ({ children, ...props }) => {
  return (
    <FlexElement
      ref={props.ref}
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

const ListCell = memo(({ children, ...props }: TypeFlexElement) => {
  return (
    <FlexElement dimensionX="hug" {...props} className={`${props.className}`}>
      {children}
    </FlexElement>
  );
});

const ListRow = memo(ListRowComponent) as unknown as TypeListRowComponent;

ListRow.Cell = ListCell;

export default ListRow;
