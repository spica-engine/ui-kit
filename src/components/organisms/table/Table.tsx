import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DefaultSkeletonCell, parsePx } from "./Column";
import styles from "./Table.module.scss";

export type TableColumnRenderCellParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  /** @deprecated Always false — cell focus has been removed. Kept for API compatibility. */
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

/** @deprecated Cell-level keyboard navigation has been removed. */
export type TableCellKeyDownParams = {
  columnKey: string;
  rowIndex: number;
  event: KeyboardEvent;
};

export type TableRowClickParams<TRow = any> = {
  row: TRow;
  rowIndex: number;
  event: React.MouseEvent<HTMLTableRowElement>;
};

export type TableSkeletonCellParams<TRow = any> = {
  column: TableColumn<TRow>;
  rowIndex: number;
};

export type TableEmptyStateProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
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
  onRowClick?: (params: TableRowClickParams<TRow>) => void;
  tableClassName?: string;
  /** @deprecated No-op — columns are now <th>/<td> elements. */
  columnClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  /** @deprecated Cell focus has been removed. Use onRowClick instead. */
  isCellFocusable?: (params: TableCellParams<TRow>) => boolean;
  /** @deprecated Cell-level keyboard navigation has been removed. */
  onCellKeyDown?: (params: TableCellKeyDownParams) => void;
  emptyState?: TableEmptyStateProps;
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

const MIN_COLUMN_WIDTH = 60;

const GHOST_BAR_WIDTHS: number[][] = [
  [36, 96, 60, 48, 120, 80],
  [36, 80, 48, 60, 96, 60],
  [36, 120, 60, 20, 80, 48],
];

const GHOST_ROW_OPACITIES = [1, 0.55, 0.25];

const TableBase = <TRow = any,>({
  columns,
  data,
  loading = false,
  skeletonRowCount = 5,
  renderSkeletonCell,
  saveToLocalStorage = { id: "table", save: false },
  fixedColumns = [],
  noResizeableColumns = [],
  onRowClick,
  tableClassName = "",
  headerClassName = "",
  cellClassName = "",
  emptyState,
}: TableProps<TRow>) => {
  const [columnWidths, setColumnWidths] = useState<Map<string, number>>(() => {
    const map = new Map<string, number>();
    columns.forEach((col) => {
      const saved = saveToLocalStorage.save
        ? localStorage.getItem(`${saveToLocalStorage.id}-${col.key}`)
        : null;
      const colMinWidth = parsePx(col.minWidth) || MIN_COLUMN_WIDTH;
      map.set(col.key, Math.max(colMinWidth, parsePx(saved ?? col.width) || 150));
    });
    return map;
  });

  // Sync column widths when columns change (new columns added/removed)
  useEffect(() => {
    setColumnWidths((prev) => {
      const next = new Map<string, number>();
      columns.forEach((col) => {
        const colMinWidth = parsePx(col.minWidth) || MIN_COLUMN_WIDTH;
        if (prev.has(col.key)) {
          next.set(col.key, Math.max(colMinWidth, prev.get(col.key)!));
        } else {
          const saved = saveToLocalStorage.save
            ? localStorage.getItem(`${saveToLocalStorage.id}-${col.key}`)
            : null;
          next.set(col.key, Math.max(colMinWidth, parsePx(saved ?? col.width) || 150));
        }
      });
      return next;
    });
  }, [columns, saveToLocalStorage.save, saveToLocalStorage.id]);

  // Persist to localStorage when widths change
  useEffect(() => {
    if (!saveToLocalStorage.save) return;
    columnWidths.forEach((width, key) => {
      localStorage.setItem(`${saveToLocalStorage.id}-${key}`, `${width}px`);
    });
  }, [columnWidths, saveToLocalStorage.save, saveToLocalStorage.id]);

  const fixedColumnOffsets = useMemo(() => {
    const offsets = new Map<string, number>();
    let offset = 0;
    for (const key of fixedColumns) {
      offsets.set(key, offset);
      offset += columnWidths.get(key) ?? 150;
    }
    return offsets;
  }, [fixedColumns, columnWidths]);

  const totalColumnsWidth = useMemo(() => {
    return columns.reduce((sum, col) => sum + (columnWidths.get(col.key) ?? 150), 0);
  }, [columns, columnWidths]);

  // ── Column resize ──────────────────────────────────────────────────────────
  const resizeStateRef = useRef<{
    columnKey: string;
    startX: number;
    startWidth: number;
    minWidth: number;
  } | null>(null);

  const handleResizerMouseDown = useCallback(
    (e: React.MouseEvent, columnKey: string) => {
      e.preventDefault();
      e.stopPropagation();
      const col = columns.find((c) => c.key === columnKey);
      const colMinWidth = parsePx(col?.minWidth) || MIN_COLUMN_WIDTH;
      resizeStateRef.current = {
        columnKey,
        startX: e.clientX,
        startWidth: columnWidths.get(columnKey) ?? 150,
        minWidth: colMinWidth,
      };
    },
    [columns, columnWidths]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStateRef.current) return;
      const { columnKey, startX, startWidth, minWidth } = resizeStateRef.current;
      const delta = e.clientX - startX;
      const newWidth = Math.max(minWidth, startWidth + delta);
      setColumnWidths((prev) => new Map(prev).set(columnKey, newWidth));
    };

    const handleMouseUp = () => {
      resizeStateRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // ── Row click ──────────────────────────────────────────────────────────────
  const handleRowClick = useCallback(
    (row: TRow, rowIndex: number, event: React.MouseEvent<HTMLTableRowElement>) => {
      if (loading) return;
      onRowClick?.({ row, rowIndex, event });
    },
    [loading, onRowClick]
  );

  const skeletonRows = useMemo(
    () => Array.from({ length: skeletonRowCount }, (_, i) => i),
    [skeletonRowCount]
  );

  const isEmpty = !loading && data.length === 0 && !!emptyState;

  return (
    <div data-testid="table-root" className={`${styles.tableRoot} ${tableClassName}`}>
      <div className={styles.tableArea}>
      <table className={styles.table} style={{ width: totalColumnsWidth }}>
        <colgroup>
          {columns.map((col) => (
            <col
              key={col.key}
              style={{ width: `${columnWidths.get(col.key) ?? 150}px` }}
            />
          ))}
        </colgroup>

        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => {
              const isFixed = fixedColumns.includes(col.key);
              const isNoResize = noResizeableColumns.includes(col.key);
              const offset = fixedColumnOffsets.get(col.key);
              return (
                <th
                  key={col.key}
                  className={`${styles.th} ${isFixed ? styles.stickyCell : ""} ${headerClassName}`}
                  style={isFixed ? { left: offset } : undefined}
                >
                  <div className={styles.thContent}>{col.header}</div>
                  {!isNoResize && (
                    <div
                      className={styles.thResizer}
                      onMouseDown={(e) => handleResizerMouseDown(e, col.key)}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {isEmpty
            ? null
            : loading
            ? skeletonRows.map((skeletonIndex) => (
                <tr key={`skeleton-${skeletonIndex}`} className={styles.skeletonRow}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`${styles.td} ${cellClassName}`}
                    >
                      <div className={styles.cellInner}>
                        {renderSkeletonCell ? (
                          renderSkeletonCell({ column: col, rowIndex: skeletonIndex })
                        ) : (
                          <DefaultSkeletonCell />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row: TRow, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`${styles.tr} ${onRowClick ? styles.trClickable : ""}`}
                  onClick={(e) => handleRowClick(row, rowIndex, e)}
                >
                  {columns.map((col) => {
                    const isFixed = fixedColumns.includes(col.key);
                    const offset = fixedColumnOffsets.get(col.key);
                    return (
                      <td
                        key={col.key}
                        className={`${styles.td} ${isFixed ? styles.stickyCell : ""} ${cellClassName}`}
                        style={isFixed ? { left: offset } : undefined}
                      >
                        <div className={styles.cellInner}>
                          {col.renderCell({ row, rowIndex, isFocused: false, columnKey: col.key })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
        </tbody>
      </table>
      </div>

      {isEmpty && (
        <div className={styles.emptyState}>
          <div className={styles.emptyGhostTable}>
            {GHOST_ROW_OPACITIES.map((opacity, rowIdx) => (
              <div
                key={rowIdx}
                className={styles.emptyGhostRow}
                style={{ opacity }}
              >
                {GHOST_BAR_WIDTHS[rowIdx].map((width, barIdx) => (
                  <div
                    key={barIdx}
                    className={styles.emptyGhostBar}
                    style={{ width }}
                  />
                ))}
                <div className={styles.emptyGhostDot} />
              </div>
            ))}
          </div>
          {emptyState.title && (
            <div className={styles.emptyTitle}>{emptyState.title}</div>
          )}
          {emptyState.description && (
            <div className={styles.emptyDescription}>{emptyState.description}</div>
          )}
          {emptyState.actions && (
            <div className={styles.emptyActions}>{emptyState.actions}</div>
          )}
        </div>
      )}
    </div>
  );
};

TableBase.displayName = "Table";

const Table = memo(TableBase) as <TRow = any>(props: TableProps<TRow>) => React.ReactElement;
export default Table;

