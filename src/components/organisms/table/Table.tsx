import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import Column, { DefaultSkeletonCell, parsePx } from "./Column";
import styles from "./Table.module.scss";

export type TableColumnRenderCellParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  isFocused: boolean;
  columnKey: string;
};

export type TableCellParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  columnKey: string;
};

export type TableColumn<TRow = any> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
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

export type TableRowClickParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  event: React.MouseEvent<HTMLDivElement>;
};

export type TableSkeletonCellParams<TRow = any> = {
  column: TableColumn<TRow>;
  rowIndex: number;
};

export type TableProps<TRow = any> = {
  columns: TableColumn<TRow>[];
  data: TRow[];
  loading?: boolean;
  skeletonRowCount?: number;
  renderSkeletonCell?: (params: TableSkeletonCellParams<TRow>) => React.ReactNode;
  saveToLocalStorage?: TableSaveToLocalStorage;
  fixedColumns?: string[];
  noResizeableColumns?: string[];
  isCellFocusable?: (params: TableCellParams<TRow>) => boolean;
  onCellKeyDown?: (params: TableCellKeyDownParams) => void;
  onRowClick?: (params: TableRowClickParams<TRow>) => void;
  tableClassName?: string;
  columnClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
};

// ─── Re-export sub-component types (public API) ──────────────────────────────
export type {
  TableColumnContainerProps,
  TableHeaderCellProps,
  TableCellProps,
} from "./Column";

// ─── Deprecated aliases (public API backward compat) ─────────────────────────
/** @deprecated Use TableProps instead */
export type TypeTable<TRow = any> = TableProps<TRow>;
/** @deprecated Use TableColumnContainerProps instead */
export type { TableColumnContainerProps as TypeColumn } from "./Column";
/** @deprecated Use TableHeaderCellProps instead */
export type { TableHeaderCellProps as TypeHeaderCell } from "./Column";
/** @deprecated Use TableCellProps instead */
export type { TableCellProps as TypeCell } from "./Column";
/** @deprecated Internal type; no replacement needed */
export type TypeColumnComponent = typeof Column;

const ARROW_KEYS = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"] as const;
type ArrowKey = (typeof ARROW_KEYS)[number];
const INTERACTIVE_ELEMENT_SELECTOR = [
  "input",
  "textarea",
  "select",
  "button",
  "a[href]",
  "[role='button']",
  "[role='textbox']",
  "[role='combobox']",
  "[role='link']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const isArrowKey = (key: string): key is ArrowKey =>
  ARROW_KEYS.includes(key as ArrowKey);

const isInteractiveElement = (
  target: EventTarget | null,
  currentTarget?: HTMLElement | null
): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const interactiveAncestor = target.closest(INTERACTIVE_ELEMENT_SELECTOR);
  if (!interactiveAncestor) return false;
  if (currentTarget && !currentTarget.contains(interactiveAncestor)) return false;

  return interactiveAncestor !== currentTarget;
};

const getNextCellPosition = (
  rowIndex: number,
  columnIndex: number,
  direction: ArrowKey,
  rowCount: number,
  columnCount: number
): { row: number; column: number } | null => {
  switch (direction) {
    case "ArrowRight":
      return columnIndex < columnCount - 1 ? { row: rowIndex, column: columnIndex + 1 } : null;
    case "ArrowLeft":
      return columnIndex > 0 ? { row: rowIndex, column: columnIndex - 1 } : null;
    case "ArrowDown":
      return rowIndex < rowCount - 1 ? { row: rowIndex + 1, column: columnIndex } : null;
    case "ArrowUp":
      return rowIndex > 0 ? { row: rowIndex - 1, column: columnIndex } : null;
    default:
      return null;
  }
};

const TableBase = <TRow = any,>({
  columns,
  data,
  loading = false,
  skeletonRowCount = 5,
  renderSkeletonCell,
  saveToLocalStorage = { id: "table", save: false },
  fixedColumns = [],
  noResizeableColumns = [],
  isCellFocusable,
  onCellKeyDown,
  onRowClick,
  tableClassName = "",
  columnClassName = "",
  headerClassName = "",
  cellClassName = "",
}: TableProps<TRow>) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [dataColumns, setDataColumns] = useState<TableColumn<TRow>[]>(() =>
    columns.map((column) => ({
      ...column,
      width: saveToLocalStorage.save
        ? localStorage.getItem(`${saveToLocalStorage.id}-${column.key}`) ||
          column.width ||
          "300px"
        : column.width || "300px",
    }))
  );

  const [focusedCell, setFocusedCell] = useState<{ column: string; row: number } | null>(null);

  const getCellParams = useCallback(
    (rowIndex: number, columnKey: string): TableCellParams<TRow> | null => {
      const hasColumn = columns.some((column) => column.key === columnKey);
      if (rowIndex < 0 || rowIndex >= data.length || !hasColumn) return null;

      const row = data[rowIndex];

      return {
        row,
        rowIndex,
        columnKey,
      };
    },
    [columns, data]
  );

  const isCellFocusableAt = useCallback(
    (rowIndex: number, columnKey: string) => {
      const cellParams = getCellParams(rowIndex, columnKey);
      if (!cellParams) return false;
      return isCellFocusable ? isCellFocusable(cellParams) : true;
    },
    [getCellParams, isCellFocusable]
  );

  const hasFocusableCells = useMemo(() => {
    if (loading) return false;

    return data.some((row, rowIndex) =>
      columns.some((column) => {
        const cellParams = { row, rowIndex, columnKey: column.key };
        return isCellFocusable ? isCellFocusable(cellParams) : true;
      })
    );
  }, [columns, data, isCellFocusable, loading]);

  useEffect(() => {
    setDataColumns((prevColumns) => {
      const prevWidthMap = new Map(prevColumns.map((col) => [col.key, col.width]));
      return columns.map((column) => {
        const savedWidth = saveToLocalStorage.save
          ? localStorage.getItem(`${saveToLocalStorage.id}-${column.key}`)
          : null;
        return {
          ...column,
          width: prevWidthMap.get(column.key) || savedWidth || column.width || "300px",
        };
      });
    });
  }, [columns, saveToLocalStorage.save, saveToLocalStorage.id]);

  const updateColumnWidth = useCallback((key: string, newWidth: string) => {
    setDataColumns((prev) =>
      prev.map((col) => (col.key === key ? { ...col, width: newWidth } : col))
    );
  }, []);

  useEffect(() => {
    if (!saveToLocalStorage.save) return;
    dataColumns.forEach((column) => {
      localStorage.setItem(`${saveToLocalStorage.id}-${column.key}`, column.width || "");
    });
  }, [dataColumns, saveToLocalStorage.save, saveToLocalStorage.id]);

  const fixedColumnOffsets = useMemo(() => {
    const offsets: Record<string, string> = {};
    let offset = 0;
    for (const key of fixedColumns) {
      offsets[key] = `${offset}px`;
      const col = dataColumns.find((dc) => dc.key === key);
      offset += parsePx(col?.width) || 300;
    }
    return offsets;
  }, [fixedColumns, dataColumns]);

  useEffect(() => {
    if (!focusedCell) return;
    if (!hasFocusableCells) {
      setFocusedCell(null);
      return;
    }

    if (!isCellFocusableAt(focusedCell.row, focusedCell.column)) {
      setFocusedCell(null);
    }
  }, [focusedCell, hasFocusableCells, isCellFocusableAt]);

  const findNextFocusableCell = useCallback(
    (startRow: number, startColumnIndex: number, direction: ArrowKey) => {
      let nextPosition = getNextCellPosition(
        startRow,
        startColumnIndex,
        direction,
        data.length,
        columns.length
      );

      while (nextPosition) {
        const nextColumn = columns[nextPosition.column];
        if (nextColumn && isCellFocusableAt(nextPosition.row, nextColumn.key)) {
          return {
            row: nextPosition.row,
            column: nextColumn.key,
          };
        }

        nextPosition = getNextCellPosition(
          nextPosition.row,
          nextPosition.column,
          direction,
          data.length,
          columns.length
        );
      }

      return null;
    },
    [columns, data.length, isCellFocusableAt]
  );

  const findBoundaryFocusableCell = useCallback(
    (direction: ArrowKey) => {
      const rowStart = direction === "ArrowUp" || direction === "ArrowLeft" ? data.length - 1 : 0;
      const rowEnd = direction === "ArrowUp" || direction === "ArrowLeft" ? -1 : data.length;
      const rowStep = direction === "ArrowUp" || direction === "ArrowLeft" ? -1 : 1;
      const columnStart =
        direction === "ArrowUp" || direction === "ArrowLeft" ? columns.length - 1 : 0;
      const columnEnd = direction === "ArrowUp" || direction === "ArrowLeft" ? -1 : columns.length;
      const columnStep = direction === "ArrowUp" || direction === "ArrowLeft" ? -1 : 1;

      for (let rowIndex = rowStart; rowIndex !== rowEnd; rowIndex += rowStep) {
        for (let columnIndex = columnStart; columnIndex !== columnEnd; columnIndex += columnStep) {
          const column = columns[columnIndex];
          if (column && isCellFocusableAt(rowIndex, column.key)) {
            return {
              row: rowIndex,
              column: column.key,
            };
          }
        }
      }

      return null;
    },
    [columns, data.length, isCellFocusableAt]
  );

  const handleCellClick = useCallback(
    (columnKey: string, rowIndex: number, event: React.MouseEvent<HTMLDivElement>) => {
      if (loading) return;
      if (isInteractiveElement(event.target, event.currentTarget)) return;

      if (!hasFocusableCells) {
        if (rowIndex >= 0 && rowIndex < data.length) {
          onRowClick?.({ row: data[rowIndex], rowIndex, event });
        }
        return;
      }

      if (!isCellFocusableAt(rowIndex, columnKey)) return;

      setFocusedCell({ column: columnKey, row: rowIndex });
      tableRef.current?.focus();
    },
    [data, hasFocusableCells, isCellFocusableAt, loading, onRowClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isInteractiveElement(event.target, event.currentTarget)) return;

      if (isArrowKey(event.key)) {
        const nextFocusedCell = focusedCell
          ? (() => {
              const colIdx = columns.findIndex((col) => col.key === focusedCell.column);
              if (colIdx === -1) {
                setFocusedCell(null);
                return null;
              }

              return findNextFocusableCell(focusedCell.row, colIdx, event.key);
            })()
          : findBoundaryFocusableCell(event.key);

        if (!nextFocusedCell) return;

        event.preventDefault();
        setFocusedCell(nextFocusedCell);
        return;
      }

      if (!focusedCell) return;

      onCellKeyDown?.({
        columnKey: focusedCell.column,
        rowIndex: focusedCell.row,
        event: event.nativeEvent,
      });
    },
    [columns, findBoundaryFocusableCell, findNextFocusableCell, focusedCell, onCellKeyDown]
  );

  const clearFocusedCell = useCallback(() => setFocusedCell(null), []);

  const handleTableBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const nextFocusedElement = event.relatedTarget;
      if (nextFocusedElement instanceof Node && tableRef.current?.contains(nextFocusedElement)) {
        return;
      }

      clearFocusedCell();
    },
    [clearFocusedCell]
  );
  const tableRefArray = useMemo(() => [tableRef], []);
  useOnClickOutside({ targetElements: tableRefArray, onClickOutside: clearFocusedCell });

  return (
    <div
      data-testid="table-root"
      ref={tableRef}
      tabIndex={hasFocusableCells ? 0 : -1}
      className={`${styles.table} ${tableClassName}`}
      onBlur={handleTableBlur}
      onKeyDown={handleKeyDown}
    >
      {dataColumns.map((column) => {
        const isFixed = fixedColumns.includes(column.key);
        return (
          <Column
            key={column.key}
            columnKey={column.key}
            className={`${styles.column} ${
              isFixed ? styles.fixedColumns : styles.scrollableColumns
            } ${columnClassName}`}
            style={{ left: isFixed ? fixedColumnOffsets[column.key] : "unset" }}
            width={column.width}
            minWidth={column.minWidth}
            updateColumnWidth={updateColumnWidth}
            noResizeable={noResizeableColumns.includes(column.key)}
          >
            <Column.Header className={headerClassName}>{column.header}</Column.Header>
            {loading
              ? Array.from({ length: skeletonRowCount }).map((_, skeletonIndex) => {
                  const cellKey = `skeleton-${column.key}-${skeletonIndex}`;
                  return (
                    <Column.Cell key={cellKey} className={cellClassName} data-skeleton-cell>
                      {renderSkeletonCell ? (
                        renderSkeletonCell({ column, rowIndex: skeletonIndex })
                      ) : (
                        <DefaultSkeletonCell />
                      )}
                    </Column.Cell>
                  );
                })
              : data.map((row: TRow, rowIndex: number) => {
                  const isFocused =
                    focusedCell?.column === column.key && focusedCell?.row === rowIndex;
                  const cellKey = `${column.key}-${rowIndex}`;
                  return (
                    <Column.Cell
                      key={cellKey}
                      focused={isFocused}
                      onClick={(event) => handleCellClick(column.key, rowIndex, event)}
                      data-cell-key={cellKey}
                      className={cellClassName}
                    >
                      {column.renderCell({ row, rowIndex, isFocused, columnKey: column.key })}
                    </Column.Cell>
                  );
                })}
          </Column>
        );
      })}
    </div>
  );
};

TableBase.displayName = "Table";

const Table = memo(TableBase) as <TRow = any>(props: TableProps<TRow>) => React.ReactElement;
export default Table;

