import React, { memo, useEffect, useRef, useState } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import styles from "./Table.module.scss";
import { TypeAlignment } from "utils/interface";

export const parsePx = (value: string | undefined): number => {
  if (!value) return 0;
  return Number.parseInt(value, 10) || 0;
};

export type TableColumnContainerProps = {
  columnKey?: string;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  minWidth?: string;
  updateColumnWidth?: (key: string, newWidth: string) => void;
  noResizeable?: boolean;
  style?: React.CSSProperties;
};

export type TableHeaderCellProps = TypeFlexElement & {
  border?: boolean;
  headerAlign?: "left" | "center" | "right";
};

export type TableCellProps = React.HTMLAttributes<HTMLDivElement> & {
  focused?: boolean;
};

const ColumnComponent = ({
  columnKey,
  children,
  className,
  width,
  minWidth,
  updateColumnWidth,
  noResizeable,
  style,
}: TableColumnContainerProps) => {
  const [columnWidth, setColumnWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);
  // Tracks the live width during drag to avoid reading stale DOM style on mouseup
  const currentWidthRef = useRef<number>(parsePx(width));

  useEffect(() => {
    setColumnWidth(width);
    currentWidthRef.current = parsePx(width);
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;

    const minWidthPx = parsePx(minWidth);

    const handleMouseMove = (e: MouseEvent) => {
      if (!columnRef.current) return;
      let newWidth = e.clientX - columnRef.current.getBoundingClientRect().left;
      if (minWidthPx > 0 && newWidth < minWidthPx) newWidth = minWidthPx;
      currentWidthRef.current = newWidth;
      setColumnWidth(`${newWidth}px`);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      let finalWidth = currentWidthRef.current;
      if (minWidthPx > 0 && finalWidth < minWidthPx) finalWidth = minWidthPx;
      updateColumnWidth?.(columnKey!, `${finalWidth}px`);
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    globalThis.addEventListener("mouseup", handleMouseUp);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, columnKey, updateColumnWidth, minWidth]);

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

export const HeaderCell = ({
  border = true,
  headerAlign = "center",
  children,
  ...props
}: TableHeaderCellProps) => {
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

export const Cell = ({ children, focused, ...props }: TableCellProps) => {
  return (
    <div
      {...props}
      className={`${styles.cell} ${focused ? styles.focusedCell : ""} ${props.className || ""}`}
    >
      {children}
    </div>
  );
};

export const DefaultSkeletonCell = () => {
  return <div className={styles.skeletonCell} />;
};

// Object.assign preserves the MemoExoticComponent type and merges sub-component
// properties — no unsafe cast needed.
const Column = Object.assign(memo(ColumnComponent), {
  Header: HeaderCell,
  Cell,
});

Column.displayName = "TableColumn";

export default Column;
