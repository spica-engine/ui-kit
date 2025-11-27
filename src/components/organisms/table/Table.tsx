import React, { memo, useEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import styles from "./Table.module.scss";
import { TypeAlignment } from "utils/interface";

export type TableColumnRenderCellParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  isFocused: boolean;
  columnKey: string;
};

export type TableColumn<TRow = any> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  renderCell: (params: TableColumnRenderCellParams<TRow>) => React.ReactNode;
};

export type TableSaveToLocalStorage = {
  id: string;
  save?: boolean;
};

export type TableCellKeyDownParams = {
  columnKey: string;
  rowIndex: number;
  event: KeyboardEvent;
};

export type TypeTable<TRow = any> = {
  columns: TableColumn<TRow>[];
  data: TRow[];
  saveToLocalStorage?: TableSaveToLocalStorage;
  fixedColumns?: string[];
  noResizeableColumns?: string[];
  onCellKeyDown?: (params: TableCellKeyDownParams) => void;
  tableClassName?: string;
  columnClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
};

const Table = <TRow = any,>({
  columns,
  data,
  saveToLocalStorage = { id: "table", save: false },
  fixedColumns = [],
  noResizeableColumns = [],
  onCellKeyDown,
  tableClassName = "",
  columnClassName = "",
  headerClassName = "",
  cellClassName = "",
}: TypeTable<TRow>) => {
  const [dataColumns, setDataColumns] = useState<TableColumn<TRow>[]>(() => {
    return columns.map((column) => {
      const savedWidth = saveToLocalStorage?.save
        ? localStorage.getItem(`${saveToLocalStorage?.id}-${column.key}`)
        : null;
      return {
        ...column,
        width: savedWidth || column.width || "300px",
      };
    });
  });

  const [focusedCell, setFocusedCell] = useState<{ column: string; row: number } | null>(null);

  const updateColumnWidth = (key: string, newWidth: string) => {
    setDataColumns((prevColumns) =>
      prevColumns.map((col) => (col.key === key ? { ...col, width: newWidth } : col))
    );
  };

  const saveColumns = (columns: TableColumn<TRow>[], tableId: string) => {
    columns.forEach((column) => {
      localStorage.setItem(`${tableId}-${column.key}`, column.width || "");
    });
  };

  useEffect(() => {
    saveColumns(dataColumns, saveToLocalStorage.id);
  }, [dataColumns, saveToLocalStorage.save]);

  const handleCellClick = (columnKey: string, index: number) => {
    setFocusedCell({ column: columnKey, row: index });
  };

  useEffect(() => {
    if (!focusedCell) return;

    const ARROW_KEYS = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"] as const;
    const isArrowKey = (key: string): boolean =>
      ARROW_KEYS.includes(key as (typeof ARROW_KEYS)[number]);

    const handleArrowRight = (currentColumnIndex: number, currentRowIndex: number) => {
      if (currentColumnIndex < columns.length - 1) {
        setFocusedCell({
          column: columns[currentColumnIndex + 1].key,
          row: currentRowIndex,
        });
      }
    };

    const handleArrowLeft = (currentColumnIndex: number, currentRowIndex: number) => {
      if (currentColumnIndex > 0) {
        setFocusedCell({
          column: columns[currentColumnIndex - 1].key,
          row: currentRowIndex,
        });
      }
    };

    const handleArrowDown = (column: string, currentRowIndex: number) => {
      if (currentRowIndex < data.length - 1) {
        setFocusedCell({
          column,
          row: currentRowIndex + 1,
        });
      }
    };

    const handleArrowUp = (column: string, currentRowIndex: number) => {
      if (currentRowIndex > 0) {
        setFocusedCell({
          column,
          row: currentRowIndex - 1,
        });
      }
    };

    const handleArrowKeyNavigation = (
      event: KeyboardEvent,
      cell: { column: string; row: number }
    ) => {
      const currentColumnIndex = columns.findIndex((col) => col.key === cell.column);
      const currentRowIndex = cell.row;

      switch (event.key) {
        case "ArrowRight":
          handleArrowRight(currentColumnIndex, currentRowIndex);
          break;
        case "ArrowLeft":
          handleArrowLeft(currentColumnIndex, currentRowIndex);
          break;
        case "ArrowDown":
          handleArrowDown(cell.column, currentRowIndex);
          break;
        case "ArrowUp":
          handleArrowUp(cell.column, currentRowIndex);
          break;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isArrowKey(event.key)) {
        event.preventDefault();
        handleArrowKeyNavigation(event, focusedCell);
      } else {
        onCellKeyDown?.({
          columnKey: focusedCell.column,
          rowIndex: focusedCell.row,
          event,
        });
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCell, columns, data, onCellKeyDown]);

  return (
    <div className={`${styles.table} ${tableClassName}`}>
      {dataColumns.map((column, index) => {
        const isFixed = fixedColumns.includes(column.key);
        const positionAmount = isFixed
          ? fixedColumns
              .slice(0, fixedColumns.indexOf(column.key))
              .reduce(
                (acc, curr) =>
                  acc +
                  Number.parseInt(dataColumns.find((dc) => dc.key === curr)?.width || "300px"),
                0
              ) + "px"
          : "unset";
        return (
          <Column
            key={column.key}
            columnKey={column.key}
            className={`${styles.column} ${
              isFixed ? styles.fixedColumns : styles.scrollableColumns
            } ${columnClassName}`}
            style={{
              left: positionAmount,
            }}
            width={column.width}
            updateColumnWidth={updateColumnWidth}
            noResizeable={noResizeableColumns.includes(column.key)}
          >
            <Column.Header className={headerClassName}>{column.header}</Column.Header>
            {data.map((row: TRow, index: number) => {
              const isFocused = focusedCell?.column === column.key && focusedCell?.row === index;
              const cellKey = `${column.key}-${index}`;
              return (
                <Column.Cell
                  key={cellKey}
                  focused={isFocused}
                  onClick={() => handleCellClick(column.key, index)}
                  data-cell-key={cellKey}
                  className={cellClassName}
                >
                  {column.renderCell({
                    row,
                    rowIndex: index,
                    isFocused,
                    columnKey: column.key,
                  })}
                </Column.Cell>
              );
            })}
          </Column>
        );
      })}
    </div>
  );
};

const MemoizedTable = memo(Table) as <TRow = any>(props: TypeTable<TRow>) => React.ReactElement;
export default MemoizedTable;

export type TypeColumn = {
  columnKey?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  width?: string;
  updateColumnWidth?: (key: string, newWidth: string) => void;
  noResizeable?: boolean;
  style?: React.CSSProperties;
};

export type TypeColumnComponent = React.FC<TypeColumn> & {
  Header: typeof HeaderCell;
  Cell: typeof Cell;
};

const ColumnComponent = ({
  columnKey,
  children,
  ref,
  className,
  width,
  updateColumnWidth,
  noResizeable,
  style,
}: TypeColumn) => {
  const [columnWidth, setColumnWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && columnRef.current) {
        const newWidth = e.clientX - columnRef.current.getBoundingClientRect().left;
        setColumnWidth(`${newWidth}px`);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      if (columnRef.current) {
        const newWidth = columnRef.current.style.minWidth;
        updateColumnWidth?.(columnKey!, newWidth);
      }
    };

    if (isResizing) {
      globalThis.addEventListener("mousemove", handleMouseMove);
      globalThis.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, columnKey, updateColumnWidth]);

  const handleResizerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsResizing(true);
  };

  const handleResizerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div ref={columnRef} className={className} style={{ ...style, minWidth: columnWidth }}>
      {children}
      {!noResizeable && (
        <button
          type="button"
          className={styles.resizer}
          aria-label="Resize column"
          onMouseDown={handleResizerMouseDown}
          onClick={handleResizerClick}
        />
      )}
    </div>
  );
};

export type TypeHeaderCell = TypeFlexElement & {
  border?: boolean;
  headerAlign?: "left" | "center" | "right";
};

const HeaderCell = ({
  border = true,
  headerAlign = "center",
  children,
  ...props
}: TypeHeaderCell) => {
  const align: Record<string, TypeAlignment> = {
    left: "leftTop",
    center: "center",
    right: "rightTop",
  };

  return (
    <FlexElement
      dimensionX="fill"
      alignment={align[headerAlign]}
      {...props}
      className={`${styles.header} ${border ? styles.border : ""} ${props.className || ""}`}
    >
      {children}
    </FlexElement>
  );
};

export type TypeCell = React.HTMLAttributes<HTMLDivElement> & {
  focused?: boolean;
};

const Cell = ({ children, focused, ...props }: TypeCell) => {
  return (
    <div
      {...props}
      className={`${styles.cell} ${focused ? styles.focusedCell : ""} ${props.className || ""}`}
    >
      {children}
    </div>
  );
};

const Column = memo(ColumnComponent) as unknown as TypeColumnComponent;

Column.Header = HeaderCell;
Column.Cell = Cell;
