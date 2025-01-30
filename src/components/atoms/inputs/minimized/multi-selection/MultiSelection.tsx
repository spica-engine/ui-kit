import React, { useRef } from "react";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Select, { TypeSelect, TypeSelectRef, TypeValue } from "components/molecules/select/Select";
import styles from "./MultiSelection.module.scss";
import { TypeLabeledValue } from "components/atoms/select-option/SelectOption";
import Button from "components/atoms/button/Button";

type TypeMultiSelectionInput = {
  options?: (string | number | TypeLabeledValue)[];
  onChange?: (value: TypeValue) => void;
  value?: TypeValue;
  selectProps?: TypeSelect;
} & TypeFluidContainer;

const MultiSelectionInput = ({
  options,
  value,
  onChange,
  selectProps,
  ...props
}: TypeMultiSelectionInput) => {
  const selectRef = useRef<TypeSelectRef>(null);

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    selectRef?.current?.clear();
  };

  return (
    <FluidContainer
      mode="fill"
      dimensionX="fill"
      root={{
        children: (
          <Select
            selectRef={selectRef}
            prefix={{ children: <Icon name="chevronDown" /> }}
            suffix={{
              children: Array.isArray(value) && value.length > 0 && (
                <Button variant="text" keepWidth={false} onClick={handleClear}>
                  <Icon name="close" />
                </Button>
              ),
            }}
            multiple
            options={options!}
            value={value!}
            onChange={(value) => onChange?.(value)}
            {...selectProps}
            className={styles.multiSelect}
          />
        ),
      }}
      {...props}
      className={`${styles.multiSelectionContainer} ${props.className}`}
    />
  );
};

export default MultiSelectionInput;
