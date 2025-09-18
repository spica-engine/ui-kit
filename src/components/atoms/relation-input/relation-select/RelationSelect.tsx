import {
  FC,
  memo,
  Ref,
  RefObject,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RelationSelect.module.scss";
import Portal from "components/atoms/portal/Portal";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import Text from "@atoms/text/Text";
import SelectOption, { TypeLabeledValue } from "@atoms/select-option/SelectOption";
import FlexElement from "@atoms/flex-element/FlexElement";
import { useOnClickOutside } from "@custom-hooks/useOnClickOutside";
import useAdaptivePosition from "@custom-hooks/useAdaptivePosition";
import { Chip, InputWithIcon, Spinner } from "index.export";
import debounce from "lodash/debounce";
import InfiniteScroll from "react-infinite-scroll-component";

export type TypeRelationSelectRef = {
  toggleDropdown: (toggleValue?: boolean) => void;
  clear: () => void;
};

export type TypeRelationSelect = {
  options: TypeLabeledValue[];
  placeholder?: string;
  placement?: "bottom" | "top";
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  popupClassName?: string;
  optionProps?: TypeFluidContainer;
  selectRef?: Ref<TypeRelationSelectRef>;
  disableClick?: boolean;
  onChange?: (value: TypeLabeledValue | TypeLabeledValue[]) => void;
  loadMoreOptions: () => void;
  searchOptions: (value: string) => void;
  totalOptionsLength: number;
  selectedOption: TypeLabeledValue | TypeLabeledValue[] | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<TypeLabeledValue | TypeLabeledValue[] | null>
  >;
  dropDownRef?: Ref<HTMLDivElement>;
};

const SEARCH_DEBOUNCE_TIME = 1000;

const RelationSelect: FC<TypeRelationSelect & TypeFluidContainer> = ({
  options,
  placeholder = "Select an option",
  placement = "bottom",
  multiple = false,
  disabled = false,
  maxCount,
  popupClassName = "",
  optionProps,
  selectRef,
  disableClick,
  onChange,
  loadMoreOptions,
  searchOptions,
  totalOptionsLength,
  selectedOption,
  setSelectedOption,
  dropDownRef,
  ...props
}) => {
  const [displayerWidth, setDisplayerWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        searchOptions(value);
      }, SEARCH_DEBOUNCE_TIME),
    [searchOptions]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    if (disableClick) return;
    setIsOpen(false);
  };

  useOnClickOutside({
    targetElements: [containerRef],
    onClickOutside: handleClose,
  });

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef,
    targetRef: dropDownRef as RefObject<HTMLElement | null>,
    initialPlacement: placement,
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDisplayerWidth(containerRef.current.offsetWidth - 50);
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current && (dropDownRef as RefObject<HTMLElement | null>)?.current) {
      calculatePosition();
    }
  }, [isOpen, options, calculatePosition]);

  const handleOptionSelect = (option: TypeLabeledValue) => {
    const updateMultipleSelection = () => {
      console.log("updateMultipleSelection", { selectedOption }); // Debugging line
      if (!Array.isArray(selectedOption)) return;
      const updatedOptions = Boolean(
        selectedOption.find((i) => i.value === option.value && i.label === option.label)
      )
        ? selectedOption.filter((el) => el.value !== option.value)
        : [...selectedOption, option];
      setSelectedOption(updatedOptions);
      onChange?.(updatedOptions as TypeLabeledValue[]);
    };

    const updateSingleSelection = () => {
      setSelectedOption(option);
      onChange?.(option);
      setIsOpen(false);
    };

    multiple ? updateMultipleSelection() : updateSingleSelection();
  };

  useImperativeHandle(selectRef, () => ({
    toggleDropdown,
    clear,
  }));

  const clear = () => {
    setSelectedOption([]);
    onChange?.([]);
    setIsOpen(false);
  };

  const toggleDropdown = (toggleValue?: boolean) => {
    if (typeof toggleValue !== "undefined") {
      setIsOpen(toggleValue);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleOnClick = () => {
    if (disabled || disableClick) return;
    toggleDropdown();
  };

  const getDisplayer = () => {
    if (
      (multiple && (!Array.isArray(selectedOption) || !selectedOption.length)) ||
      typeof options[0] !== "object"
    ) {
      return placeholder;
    }

    return (
      (selectedOption as TypeLabeledValue[])?.map?.((option) => (
        <Chip
          variant="outlined"
          key={`${option.value}${option.label}`}
          label={option.label as string}
          onDelete={() => handleOptionSelect(option)}
        />
      )) ??
      (selectedOption as TypeLabeledValue)?.label ??
      placeholder
    );
  };

  const infiniteScrollId = useId();

  return (
    <>
      <FluidContainer
        ref={containerRef}
        onClick={handleOnClick}
        dimensionX="fill"
        dimensionY={36}
        root={{
          children: (
            <Text
              style={{
                maxWidth: displayerWidth,
                ...props.root?.style,
              }}
              className={`${props.root?.className} ${styles.displayer}`}
            >
              {getDisplayer()}
            </Text>
          ),
          dimensionX: "fill",
          alignment: "leftCenter",
        }}
        suffix={{
          onClick: (e) => {
            e.stopPropagation();
            setSelectedOption(multiple ? [] : null);
          },
          children: <Icon className={styles.deleteIcon} name="delete" size="sm" />,
        }}
        {...props}
        className={`${props.className} ${styles.container} ${disabled && styles.disabled}`}
      />
      {isOpen && (
        <Portal onClickOutside={handleClose}>
          <FlexElement
            ref={dropDownRef as RefObject<HTMLDivElement>}
            style={{ ...targetPosition }}
            className={`${popupClassName} ${styles.selectDropdown}`}
            direction="vertical"
            alignment="leftTop"
            gap={0}
            id={infiniteScrollId}
          >
            <InfiniteScroll
              dataLength={options.length}
              next={loadMoreOptions}
              hasMore={totalOptionsLength > options.length}
              loader={<Spinner size="small" />}
              scrollableTarget={infiniteScrollId}
              className={styles.infiniteScroll}
            >
              <div className={styles.searchInputWrapper}>
                <InputWithIcon
                  gap={10}
                  dimensionX={400}
                  prefix={{ children: <Icon name="magnify" className={styles.searchIcon} /> }}
                  inputProps={{
                    placeholder: "Search",
                    value: searchValue,
                    onChange: (e) => setSearchValue(e.target.value),
                  }}
                  className={styles.searchInput}
                />
              </div>
              {options.map((option) => {
                const optionValue = typeof option === "object" ? option.value : option;
                const selected = multiple
                  ? Array.isArray(selectedOption) &&
                    Boolean(
                      selectedOption.find(
                        (i) => i.value === option.value && i.label === option.label
                      )
                    )
                  : selectedOption === option;

                const isDisabled =
                  multiple &&
                  !!maxCount &&
                  Array.isArray(selectedOption) &&
                  selectedOption.length >= maxCount &&
                  !selected;

                return (
                  <SelectOption
                    disabled={isDisabled}
                    dimensionX={containerRef.current?.offsetWidth}
                    key={optionValue.toString()}
                    multiple={multiple}
                    option={option}
                    selected={selected}
                    onClick={() => handleOptionSelect(option)}
                    {...optionProps}
                  />
                );
              })}
            </InfiniteScroll>
          </FlexElement>
        </Portal>
      )}
    </>
  );
};

export default memo(RelationSelect);
