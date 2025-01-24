import React, { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import styles from "./Autocomplete.module.scss";
import { TypeFluidContainer } from "../fluid-container/FluidContainer";
import ListItem from "../list-item/ListItem";
import InputWithIcon from "../input-with-icon/InputWithIcon";

type TypeAutocomplete = {
  value?: string;
  className?: string;
  options: string[];
  placeholder?: string;
  position?: "bottom" | "top";
  popupClassName?: string;
  onChange?: (value: string) => void;
};

const Autocomplete: FC<TypeAutocomplete & TypeFluidContainer> = ({
  className,
  value = "",
  position = "bottom",
  popupClassName = "",
  placeholder = "",
  options,
  onChange,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: number;
    left?: number;
    right?: number;
  }>({});

  useEffect(() => {
    filterOptions(search);
  }, [search, options]);

  useEffect(() => {
    if (showMenu) calculatePosition();
  }, [showMenu, filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(event.target as Node) &&
        !containerRef.current?.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = (query: string) => {
    setFilteredOptions(
      query
        ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
        : options
    );
  };

  const calculatePosition = () => {
    if (!containerRef.current || !dropdownRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const positions = {
      bottom: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: viewportWidth - rect.right - window.scrollX,
      },
      top: {
        top: rect.top - dropdownHeight + window.scrollY,
        left: rect.left + window.scrollX,
        right: viewportWidth - rect.right - window.scrollX,
      },
    };

    if (
      position === "bottom" &&
      rect.bottom + dropdownHeight > viewportHeight &&
      rect.top - dropdownHeight >= 0
    ) {
      setDropdownPosition(positions.top);
    } else if (
      position === "top" &&
      rect.top - dropdownHeight < 0 &&
      rect.bottom + dropdownHeight <= viewportHeight
    ) {
      setDropdownPosition(positions.bottom);
    } else {
      setDropdownPosition(positions[position]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleItemSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setSearch(selectedValue);
    setShowMenu(false);
  };

  const toggleDropdown = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <InputWithIcon
        placeholder={placeholder}
        ref={containerRef}
        value={search}
        onClick={toggleDropdown}
        onChange={handleInputChange}
        inputContainerProps={{ className: styles.input }}
        {...props}
      />
      {showMenu && (
        <div
          ref={dropdownRef}
          style={{
            ...dropdownPosition,
            width: containerRef.current?.offsetWidth || "100%",
          }}
          className={`${popupClassName} ${styles.menuItems}`}
        >
          {filteredOptions.map((option) => (
            <ListItem
              key={option}
              label={option}
              onSelect={handleItemSelect}
              active={option.toLowerCase() === search.toLowerCase()}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default memo(Autocomplete);
