import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RelationInput.module.scss";
import { TypeRelationSelect } from "./relation-select/RelationSelect";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { TypeBaseInputProps } from "@atoms/base-input/BaseInput";
import { TypeLabeledValue } from "index.export";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash/debounce";

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

const SEARCH_DEBOUNCE_MS = 300;

const RelationInput = <T extends TypeLabeledValue>({
  label,
  description,
  value,
  onChange,
  selectProps,
  getOptions,
  loadMoreOptions,
  searchOptions,
  totalOptionsLength,
  multiple = false,
  externalDropdownRef,
  disabled = false,
  errorMessage,
}: TypeRelationInput<T>) => {
  const rawId = useId();
  const scrollContainerId = rawId.replace(/:/g, "");

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<TypeLabeledValue[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<TypeLabeledValue[]>(() => {
    if (!value) return [];
    return Array.isArray(value)
      ? [...(value as TypeLabeledValue[])]
      : [value as TypeLabeledValue];
  });

  useEffect(() => {
    if (value === undefined || value === null) return;
    setSelected(
      Array.isArray(value)
        ? [...(value as TypeLabeledValue[])]
        : [value as TypeLabeledValue]
    );
  }, [value]);

  useEffect(() => {
    getOptions().then(setOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useImperativeHandle(
    externalDropdownRef ?? { current: null },
    () => dropdownRef.current as HTMLDivElement
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((v: string) => {
        searchOptions(v).then(setOptions);
      }, SEARCH_DEBOUNCE_MS),
    [searchOptions]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => {
      if (!prev) {
        setSearchValue("");
        getOptions().then(setOptions);
      }
      return !prev;
    });
  }, [disabled, getOptions]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setSearchValue(v);
      debouncedSearch(v);
    },
    [debouncedSearch]
  );

  const isOptionSelected = useCallback(
    (option: TypeLabeledValue) =>
      selected.some((s) => String(s.value) === String(option.value)),
    [selected]
  );

  const handleSelect = useCallback(
    (option: TypeLabeledValue) => {
      let next: TypeLabeledValue[];
      if (multiple) {
        if (isOptionSelected(option)) {
          next = selected.filter((s) => String(s.value) !== String(option.value));
        } else {
          next = [...selected, option];
        }
      } else {
        next = [option];
        setIsOpen(false);
      }
      setSelected(next);
      onChange?.(next as T[]);
    },
    [multiple, selected, isOptionSelected, onChange]
  );

  const handleRemove = useCallback(
    (option: TypeLabeledValue, e: React.MouseEvent) => {
      e.stopPropagation();
      const next = selected.filter((s) => String(s.value) !== String(option.value));
      setSelected(next);
      onChange?.(next as T[]);
    },
    [selected, onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelected([]);
      onChange?.([] as T[]);
    },
    [onChange]
  );

  const handleLoadMore = useCallback(() => {
    loadMoreOptions().then((more) => setOptions((prev) => [...prev, ...more]));
  }, [loadMoreOptions]);

  const placeholder = selectProps?.placeholder ?? "Select\u2026";

  return (
    <div
      ref={containerRef}
      className={`${styles.relationInput}${disabled ? ` ${styles.disabled}` : ""}`}
    >
      <div className={styles.fieldLabel}>
        <span className={styles.fieldName}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
          {label}
        </span>
        <span className={styles.fieldTypeBadge}>relation</span>
      </div>

      <div
        className={[
          styles.trigger,
          isOpen ? styles.triggerOpen : "",
          errorMessage ? styles.triggerError : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className={styles.triggerIcon}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="6" y1="9" x2="6" y2="15" />
            <path d="M18 15V9a3 3 0 0 0-3-3H9" />
          </svg>
        </div>

        <div className={styles.triggerBody}>
          {selected.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            selected.map((item) => (
              <span key={String(item.value)} className={styles.tag}>
                {item.label}
                <span
                  className={styles.tagRemove}
                  onClick={(e) => handleRemove(item, e)}
                  role="button"
                  aria-label={`Remove ${item.label}`}
                >
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              </span>
            ))
          )}
        </div>

        <div className={styles.modeDisplay}>
          <span className={`${styles.modePill}${!multiple ? ` ${styles.modePillActive}` : ""}`}>1</span>
          <span className={`${styles.modePill}${multiple ? ` ${styles.modePillActive}` : ""}`}>&#8734;</span>
        </div>

        <div className={styles.triggerActions}>
          {selected.length > 0 && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              title="Clear"
              type="button"
              aria-label="Clear selection"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>
          )}
          <svg
            className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ""}`}
            width="14" height="14" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.search}>
            <svg className={styles.searchIcon} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </div>

          <div className={styles.results} id={scrollContainerId}>
            {options.length === 0 ? (
              <div className={styles.empty}>No results found</div>
            ) : (
              <InfiniteScroll
                dataLength={options.length}
                next={handleLoadMore}
                hasMore={options.length < totalOptionsLength}
                loader={
                  <div className={styles.loading}>
                    <svg className={styles.spinner} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 0 1 0 20" />
                    </svg>
                    Loading&hellip;
                  </div>
                }
                scrollableTarget={scrollContainerId}
                style={{ overflow: "hidden" }}
              >
                {options.map((option) => {
                  const sel = isOptionSelected(option);
                  return (
                    <div
                      key={String(option.value)}
                      className={`${styles.item}${sel ? ` ${styles.itemSelected}` : ""}`}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={sel}
                    >
                      <div className={`${styles.itemCheck}${sel ? ` ${styles.itemCheckSelected}` : ""}`}>
                        <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className={styles.itemBody}>
                        <div className={styles.itemId}>{option.label}</div>
                      </div>
                    </div>
                  );
                })}
              </InfiniteScroll>
            )}
          </div>

          <div className={styles.dropdownFoot}>
            <span className={styles.footCount}>
              <strong>{selected.length}</strong> selected
            </span>
            <span className={styles.footClear} onClick={handleClear} role="button">
              Clear
            </span>
          </div>
        </div>
      )}

      {(errorMessage || description) && (
        <div className={`${styles.helper}${errorMessage ? ` ${styles.helperError}` : ""}`}>
          {errorMessage ?? description}
        </div>
      )}
    </div>
  );
};

export default memo(RelationInput) as typeof RelationInput;
