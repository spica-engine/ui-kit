import {
  FC,
  KeyboardEvent,
  memo,
  MouseEvent,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./Select.module.scss";
import Portal from "components/atoms/portal/Portal";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import FlexElement from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Text from "@atoms/text/Text";
import Input from "@atoms/input/Input";
import Chip from "@atoms/chip/Chip";
import SelectOption, { TypeLabeledValue } from "@atoms/select-option/SelectOption";
import useAdaptivePosition from "@custom-hooks/useAdaptivePosition";
import { IconName } from "@utils/iconList";

export type TypeValue = string | number | (string | number)[];

export type TypeSelectRef = {
  toggleDropdown: (toggleValue?: boolean) => void;
  clear: () => void;
};

export type TypeOptionGroup = {
  label: string;
  items: (string | number | TypeLabeledValue)[];
};

export type TypeSelect = {
  value?: TypeValue;
  options?: (string | number | TypeLabeledValue)[];
  groups?: TypeOptionGroup[];
  placeholder?: string;
  placement?: "bottom" | "top";
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  showFooter?: boolean;
  allowFreeform?: boolean;
  prefixIcon?: IconName;
  popupClassName?: string;
  optionProps?: TypeFluidContainer;
  selectRef?: Ref<TypeSelectRef>;
  disableClick?: boolean;
  onChange?: (value: TypeValue) => void;
  externalDropdownRef?: RefObject<HTMLDivElement | null>;
};

const Select: FC<TypeSelect & TypeFluidContainer> = ({
  value,
  options = [],
  groups,
  placeholder = "Select an option",
  placement = "bottom",
  multiple = false,
  disabled = false,
  maxCount,
  clearable = false,
  searchable = false,
  showFooter = false,
  allowFreeform = false,
  prefixIcon,
  popupClassName = "",
  optionProps,
  selectRef,
  disableClick,
  onChange,
  externalDropdownRef,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<TypeValue | null>(
    value !== undefined ? value : multiple ? [] : null
  );

  useEffect(() => {
    if (value === undefined) return;
    setSelectedOption(value);
  }, [value]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const msInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(
    externalDropdownRef ?? { current: null },
    () => dropdownRef.current as HTMLDivElement
  );

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef,
    targetRef: dropdownRef,
    initialPlacement: placement,
  });

  useLayoutEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      calculatePosition();
    }
  }, [isOpen, options, groups, calculatePosition]);

  // ─── option helpers ──────────────────────────────────────────────────────────

  const getAllOptions = useCallback((): (string | number | TypeLabeledValue)[] => {
    if (groups) return groups.flatMap((g) => g.items);
    return options;
  }, [groups, options]);

  const getOptionValue = (opt: string | number | TypeLabeledValue): string | number =>
    typeof opt === "object" ? opt.value : opt;

  const getOptionLabel = (opt: string | number | TypeLabeledValue): string =>
    typeof opt === "object" ? opt.label : String(opt);

  const getLabelByValue = (val: string | number): string => {
    const all = getAllOptions();
    const found = (all as TypeLabeledValue[]).find((o) => typeof o === "object" && o.value === val);
    return found ? (found as TypeLabeledValue).label : String(val);
  };

  const isLabeled = (): boolean => {
    const all = getAllOptions();
    return all.length > 0 && typeof all[0] === "object";
  };

  const hasValue = (): boolean => {
    if (multiple) return Array.isArray(selectedOption) && selectedOption.length > 0;
    return selectedOption !== null && selectedOption !== undefined && selectedOption !== "";
  };

  const filterOption = (opt: string | number | TypeLabeledValue): boolean => {
    if (!searchQuery) return true;
    return getOptionLabel(opt).toLowerCase().includes(searchQuery.toLowerCase());
  };

  // ─── selection handlers ───────────────────────────────────────────────────────

  const handleOptionSelect = (option: string | number) => {
    if (multiple) {
      if (!Array.isArray(selectedOption)) return;
      const updated = selectedOption.includes(option)
        ? selectedOption.filter((el) => el !== option)
        : [...selectedOption, option];
      setSelectedOption(updated);
      onChange?.(updated);
    } else {
      setSelectedOption(option);
      onChange?.(option);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const addFreeformTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (!Array.isArray(selectedOption)) return;
    if (!selectedOption.includes(trimmed)) {
      const updated = [...selectedOption, trimmed];
      setSelectedOption(updated);
      onChange?.(updated);
    }
    setSearchQuery("");
    if (msInputRef.current) msInputRef.current.value = "";
  };

  const handleFreeformKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    if ((e.key === "Enter" || e.key === ",") && val.trim()) {
      e.preventDefault();
      if (allowFreeform) addFreeformTag(val);
    } else if (e.key === "Backspace" && !val && Array.isArray(selectedOption) && selectedOption.length) {
      const updated = selectedOption.slice(0, -1);
      setSelectedOption(updated);
      onChange?.(updated);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  useImperativeHandle(selectRef, () => ({
    toggleDropdown,
    clear,
  }));

  const clear = () => {
    setSelectedOption(multiple ? [] : null);
    onChange?.(multiple ? [] : "");
    setSearchQuery("");
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
    if (multiple) setTimeout(() => msInputRef.current?.focus(), 0);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    clear();
  };

  const handleSelectAll = () => {
    const all = getAllOptions().map(getOptionValue);
    setSelectedOption(all);
    onChange?.(all);
  };

  // ─── displayer (single mode) ─────────────────────────────────────────────────

  const getDisplayer = (): string => {
    if (!hasValue()) return placeholder;
    if (isLabeled()) return getLabelByValue(selectedOption as string | number);
    return String(selectedOption);
  };

  // ─── option list renderer ─────────────────────────────────────────────────────

  const renderOptions = (items: (string | number | TypeLabeledValue)[], width?: number) => {
    const filtered = items.filter(filterOption);
    if (!filtered.length) return null;
    return filtered.map((option) => {
      const optionValue = getOptionValue(option);
      const selected = multiple
        ? Array.isArray(selectedOption) && selectedOption.includes(optionValue)
        : selectedOption === optionValue;
      const isDisabled =
        multiple &&
        !!maxCount &&
        Array.isArray(selectedOption) &&
        selectedOption.length >= maxCount &&
        !selected;
      return (
        <SelectOption
          disabled={isDisabled}
          dimensionX={width ?? containerRef.current?.offsetWidth}
          key={optionValue.toString()}
          multiple={multiple}
          option={option}
          selected={selected}
          onClick={() => handleOptionSelect(optionValue)}
          {...optionProps}
        />
      );
    });
  };

  const renderDropdownContent = () => {
    const width = containerRef.current?.offsetWidth;
    const allOptions = getAllOptions();
    const allFiltered = allOptions.filter(filterOption);

    // freeform "Add '...'" row
    const showAddNew =
      allowFreeform &&
      multiple &&
      searchQuery.trim() &&
      !allOptions.find(
        (o) => getOptionLabel(o).toLowerCase() === searchQuery.trim().toLowerCase()
      );

    const isEmpty = !showAddNew && allFiltered.length === 0;

    return (
      <div className={styles.optionList}>
        {showAddNew && (
          <div
            className={styles.addNewRow}
            onClick={() => addFreeformTag(searchQuery)}
          >
            <div className={styles.addNewIcon}>
              <Icon name="plus" size="sm" />
            </div>
            <span>
              Add &ldquo;<strong>{searchQuery.trim()}</strong>&rdquo;
            </span>
          </div>
        )}

        {isEmpty && (
          <div className={styles.emptyState}>No results</div>
        )}

        {groups
          ? groups.map((group, gi) => {
              const groupItems = renderOptions(group.items, width);
              if (!groupItems) return null;
              return (
                <div key={gi}>
                  {gi > 0 && <div className={styles.groupDivider} />}
                  <div className={styles.groupLabel}>{group.label}</div>
                  {groupItems}
                </div>
              );
            })
          : renderOptions(allOptions, width)}
      </div>
    );
  };

  // ─── footer ───────────────────────────────────────────────────────────────────

  const renderFooter = () => {
    if (!showFooter) return null;
    const count = Array.isArray(selectedOption) ? selectedOption.length : hasValue() ? 1 : 0;
    return (
      <div className={styles.footer}>
        {multiple && (
          <span className={styles.selectAll} onClick={handleSelectAll}>
            Select all
          </span>
        )}
        <span className={styles.countBadge}>{count} selected</span>
        {multiple && (
          <span className={styles.clearAll} onClick={clear}>
            Clear all
          </span>
        )}
      </div>
    );
  };

  // ─── multiselect trigger ─────────────────────────────────────────────────────

  if (multiple) {
    const tags = Array.isArray(selectedOption) ? (selectedOption as (string | number)[]) : [];

    return (
      <>
        <div
          ref={containerRef as RefObject<HTMLDivElement>}
          onClick={handleOnClick}
          className={`${props.className ?? ""} ${styles.multiTrigger} ${isOpen ? styles.open : ""} ${disabled ? styles.disabled : ""}`}
        >
          {tags.map((v) => (
            <Chip
              key={v.toString()}
              label={isLabeled() ? getLabelByValue(v) : String(v)}
              onDelete={(e?: MouseEvent) => {
                e?.stopPropagation();
                const updated = tags.filter((t) => t !== v);
                setSelectedOption(updated);
                onChange?.(updated);
              }}
            />
          ))}
          <input
            ref={msInputRef}
            className={styles.msInput}
            placeholder={tags.length === 0 ? placeholder : ""}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onKeyDown={handleFreeformKey}
            disabled={disabled}
          />
          <div className={styles.msControls} onClick={(e) => e.stopPropagation()}>
            {clearable && hasValue() && (
              <button className={`${styles.msCtrlBtn} ${styles.clearBtn}`} onClick={handleClear} tabIndex={-1}>
                <Icon name="close" size="sm" />
              </button>
            )}
            <div className={styles.msSep} />
            <button
              className={`${styles.msCtrlBtn} ${styles.arrowBtn}`}
              onClick={(e) => { e.stopPropagation(); handleOnClick(); }}
              tabIndex={-1}
            >
              <Icon name="chevronDown" size="sm" className={isOpen ? styles.arrowOpen : ""} />
            </button>
          </div>
        </div>

        {isOpen && (
          <Portal
            onClickOutside={() => { if (!disableClick) { setIsOpen(false); setSearchQuery(""); } }}
            additionalRefs={[containerRef, dropdownRef]}
          >
            <FlexElement
              ref={dropdownRef}
              style={{ ...targetPosition }}
              className={`${popupClassName} ${styles.selectDropdown}`}
              direction="vertical"
              alignment="leftTop"
              gap={0}
            >
              {renderDropdownContent()}
              {renderFooter()}
            </FlexElement>
          </Portal>
        )}
      </>
    );
  }

  // ─── single select trigger ────────────────────────────────────────────────────

  return (
    <>
      <FluidContainer
        ref={containerRef}
        onClick={handleOnClick}
        dimensionX="fill"
        dimensionY={36}
        {...props}
        prefix={
          prefixIcon
            ? {
                children: <Icon name={prefixIcon} />,
                className: styles.prefixSlot,
                alignment: "center",
                dimensionX: "hug",
              }
            : props.prefix
        }
        root={{
          children: (
            <>
              {searchable && isOpen ? (
                <input
                  autoFocus
                  className={styles.searchInline}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search…"
                />
              ) : (
                <Text
                  style={props.root?.style}
                  className={`${props.root?.className ?? ""} ${styles.displayer} ${!hasValue() ? styles.placeholder : ""}`}
                >
                  {getDisplayer()}
                </Text>
              )}
            </>
          ),
          dimensionX: "fill",
          alignment: "leftCenter",
        }}
        suffix={{
          children: (
            <div className={styles.suffixGroup}>
              {clearable && hasValue() && (
                <button className={`${styles.arrowBtn} ${styles.clearBtn}`} onClick={handleClear} tabIndex={-1}>
                  <Icon name="close" size="sm" />
                </button>
              )}
              <div className={styles.arrowSep} />
              <div className={`${styles.arrowBtn} ${isOpen ? styles.arrowBtnOpen : ""}`}>
                <Icon name="chevronDown" size="sm" className={isOpen ? styles.arrowOpen : ""} />
              </div>
            </div>
          ),
          dimensionX: "hug",
          alignment: "rightCenter",
        }}
        className={`${props.className ?? ""} ${styles.container} ${disabled ? styles.disabled : ""}`}
      />

      {isOpen && (
        <Portal
          onClickOutside={() => { if (!disableClick) { setIsOpen(false); setSearchQuery(""); } }}
          additionalRefs={[containerRef, dropdownRef]}
        >
          <FlexElement
            ref={dropdownRef}
            style={{ ...targetPosition }}
            className={`${popupClassName} ${styles.selectDropdown}`}
            direction="vertical"
            alignment="leftTop"
            gap={0}
          >
            {searchable && (
              <div className={styles.searchRow}>
                <Icon name="magnify" size="sm" />
                <Input
                  autoFocus
                  className={styles.searchInput}
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                />
              </div>
            )}
            {renderDropdownContent()}
            {renderFooter()}
          </FlexElement>
        </Portal>
      )}
    </>
  );
};

export default memo(Select);
