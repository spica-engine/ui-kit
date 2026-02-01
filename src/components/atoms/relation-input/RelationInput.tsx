import BaseInput, { TypeBaseInputProps } from "@atoms/base-input/BaseInput";
import Icon from "@atoms/icon/Icon";
import Text from "@atoms/text/Text";
import React, { memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./RelationInput.module.scss";
import RelationSelect, {
  TypeRelationSelect,
  TypeRelationSelectRef,
} from "./relation-select/RelationSelect";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { TypeLabeledValue } from "index.export";

export type RelationType = "onetoone" | "onetomany";

export type TypeRelationInput<T = TypeLabeledValue> = {
  label: string;
  description?: string;
  value?: T | T[];
  onChange?: (value: T[]) => void;
  selectProps?: TypeRelationSelect & TypeFluidContainer;
  inputContainerClassName?: string;
  getOptions: () => Promise<TypeLabeledValue[]>;
  loadMoreOptions: () => Promise<TypeLabeledValue[]>;
  searchOptions: (value: string) => Promise<TypeLabeledValue[]>;
  totalOptionsLength: number;
  multiple?: boolean;
  externalDropdownRef?: React.RefObject<HTMLDivElement>;
} & Omit<TypeBaseInputProps, "children">;

const RelationInput = <T extends TypeLabeledValue>({
  label,
  description,
  value,
  onChange,
  selectProps,
  inputContainerClassName,
  getOptions,
  loadMoreOptions,
  searchOptions,
  totalOptionsLength,
  multiple,
  externalDropdownRef,
  ...props
}: TypeRelationInput<T>) => {
  const selectRef = useRef<TypeRelationSelectRef>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<TypeLabeledValue[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<
    TypeLabeledValue[] | TypeLabeledValue | null
  >(() => value || (multiple ? [] : null));

  useEffect(() => {
    if (!value && value !== 0 && value !== "") return;
    setSelectedOption(value);
  }, [value]);

  const handleOnFocusChange = (isFocused: boolean) => {
    selectRef?.current?.toggleDropdown(isFocused);
  };

  useEffect(() => {
    getOptions().then((result) => setOptions(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendMoreOptions = () => {
    loadMoreOptions().then((result) => setOptions([...(options ?? []), ...result]));
  };

  const filterOptions = (searchValue: string) => {
    searchOptions(searchValue).then((result) => {
      setOptions(result);
    });
  };

  useImperativeHandle(
    selectProps?.selectRef ?? { current: null },
    () => selectRef.current as TypeRelationSelectRef
  );

  useImperativeHandle(
    externalDropdownRef ?? { current: null },
    () => dropDownRef.current as HTMLDivElement
  );

  return (
    <BaseInput
      dimensionX={"fill"}
      description={description}
      dropDownRef={dropDownRef}
      onFocusChange={handleOnFocusChange}
      labelProps={{
        dimensionX: "hug",
        divider: true,
        prefix: {
          children: <Icon className={styles.icon} name="callMerge" />,
        },
        root: {
          dimensionX: "hug",
          children: (
            <Text className={styles.text} size="medium">
              {label}
            </Text>
          ),
        },
      }}
      inputContainerProps={{ className: `${styles.baseInput} ${inputContainerClassName}` }}
      {...props}
    >
      <RelationSelect
        totalOptionsLength={totalOptionsLength}
        disableClick
        options={options}
        placeholder=""
        multiple={multiple}
        onChange={(value) => {
          onChange?.(value as T[]);
        }}
        {...selectProps}
        selectRef={selectRef}
        className={`${styles.select} ${selectProps?.className}`}
        loadMoreOptions={appendMoreOptions}
        searchOptions={filterOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        dropDownRef={dropDownRef}
      />
    </BaseInput>
  );
};

export default memo(RelationInput);
