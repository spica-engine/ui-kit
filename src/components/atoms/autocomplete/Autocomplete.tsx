import React, { ChangeEvent, FC, memo, useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "./Autocomplete.module.scss";
import { TypeFluidContainer } from "../fluid-container/FluidContainer";
import ListItem from "../list-item/ListItem";
import InputWithIcon from "../input-with-icon/InputWithIcon";
import FlexElement from "../flex-element/FlexElement";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import useAdaptivePosition from "custom-hooks/useAdaptivePosition";

type TypeAutocomplete = {
  value?: string;
  className?: string;
  options: string[];
  placeholder?: string;
  placement?: "bottom" | "top";
  popupClassName?: string;
  onChange?: (value: string) => void;
};

const Autocomplete: FC<TypeAutocomplete & TypeFluidContainer> = ({
  className,
  value = "",
  placement = "bottom",
  popupClassName = "",
  placeholder = "",
  options,
  onChange,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside({
    refs: [menuRef, containerRef],
    onClickOutside: () => setShowMenu(false),
  });

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef,
    targetRef: menuRef,
    initialPlacement: placement,
  });

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    filterOptions(search);
  }, [search, options]);

  useLayoutEffect(() => {
    if (showMenu && containerRef.current && menuRef.current) {
      calculatePosition();
    }
  }, [showMenu, filteredOptions, calculatePosition]);

  const filterOptions = (query: string) => {
    setFilteredOptions(
      query
        ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
        : options
    );
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
        ref={containerRef}
        placeholder={placeholder}
        dimensionX="fill"
        value={search}
        onClick={toggleDropdown}
        onChange={handleInputChange}
        inputContainerProps={{ className: styles.input }}
        {...props}
      />
      {showMenu && (
        <FlexElement
          ref={menuRef}
          style={{ ...targetPosition }}
          className={`${popupClassName} ${styles.menuItems}`}
          direction="vertical"
          alignment="leftTop"
          gap={0}
        >
          {filteredOptions.map((option) => (
            <ListItem
              dimensionX={containerRef.current?.offsetWidth}
              key={option}
              label={option}
              onSelect={handleItemSelect}
              active={option.toLowerCase() === search.toLowerCase()}
            />
          ))}
        </FlexElement>
      )}
    </>
  );
};

export default memo(Autocomplete);
