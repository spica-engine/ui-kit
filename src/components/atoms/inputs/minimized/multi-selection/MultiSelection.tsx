import React from "react";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { TypeSelect, TypeValue } from "@molecules/select/Select";
import styles from "./MultiSelection.module.scss";
import { TypeLabeledValue } from "@atoms/select-option/SelectOption";

export type TypeMultiSelectionInput = {
  options?: (string | number | TypeLabeledValue)[];
  onChange?: (value: TypeValue) => void;
  value?: TypeValue;
  selectProps?: TypeSelect;
} & TypeFluidContainer;

const MultipleSelectionMinimizedInput = ({
  options,
  value,
  selectProps: _selectProps,
  onChange: _onChange,
  className,
  // strip FluidContainer-specific props that don't apply to a plain div
  prefix: _prefix,
  root: _root,
  suffix: _suffix,
  mode: _mode,
  ...props
}: TypeMultiSelectionInput) => {
  const tags = Array.isArray(value) ? (value as (string | number)[]) : [];

  const getLabelByValue = (val: string | number): string => {
    if (!options || options.length === 0) return String(val);
    const found = (options as TypeLabeledValue[]).find(
      (o) => typeof o === "object" && o.value === val
    );
    return found ? found.label : String(val);
  };

  return (
    <div
      className={`${styles.multiSelectionContainer} ${className ?? ""}`}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      <div className={styles.selectedValues}>
        {tags.map((v) => (
          <span key={String(v)} className={styles.selectedTag}>
            {getLabelByValue(v)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectionMinimizedInput;
