import { FC, memo, Ref, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import SelectOption, { TypeLabeledValue } from "components/atoms/select-option/SelectOption";
import FlexElement from "components/atoms/flex-element/FlexElement";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import useAdaptivePosition from "custom-hooks/useAdaptivePosition";

export type TypeValue = string | number | (string | number)[];

export type TypeSelectRef = {
  toggleDropdown: (toggleValue?: boolean) => void;
  clear: () => void;
};

export type TypeSelect = {
  value?: TypeValue;
  options: (string | number | TypeLabeledValue)[];
  placeholder?: string;
  placement?: "bottom" | "top";
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  popupClassName?: string;
  optionProps?: TypeFluidContainer;
  selectRef?: Ref<TypeSelectRef>;
  disableClick?: boolean;
  onChange: (value: TypeValue) => void;
};

const Select: FC<TypeSelect & TypeFluidContainer> = ({
  value,
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
  ...props
}) => {
  const [displayerWidth, setDisplayerWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TypeValue | null>(
    value || (multiple ? [] : null)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside({
    refs: [dropdownRef, containerRef],
    onClickOutside: () => {
      if (disableClick) return;
      setIsOpen(false);
    },
  });

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef,
    targetRef: dropdownRef,
    initialPlacement: placement,
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDisplayerWidth(containerRef.current.offsetWidth - 50);
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      calculatePosition();
    }
  }, [isOpen, options, calculatePosition]);

  const handleOptionSelect = (option: string | number) => {
    const updateMultipleSelection = () => {
      if (!Array.isArray(selectedOption)) return;
      const updatedOptions = selectedOption.includes(option)
        ? selectedOption.filter((el) => el !== option)
        : [...selectedOption, option];
      setSelectedOption(updatedOptions);
      onChange(updatedOptions as unknown as string | number);
    };

    const updateSingleSelection = () => {
      setSelectedOption(option);
      onChange(option);
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
    onChange([]);
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

  const getDisplayer = (): string => {
    if (!selectedOption) return placeholder;

    if (multiple) {
      return handleMultipleSelection(selectedOption as (string | number)[]);
    }

    return handleSingleSelection(selectedOption as string | number);
  };

  const handleSingleSelection = (selectedOption: string | number): string => {
    if (typeof options[0] !== "object") return String(selectedOption);
    return getLabelByValue(selectedOption) as string;
  };

  const handleMultipleSelection = (selectedOption: (string | number)[]): string => {
    if (!selectedOption.length) return placeholder;

    if (typeof options[0] === "object") {
      return selectedOption.map((option) => getLabelByValue(option)).join(", ");
    }

    return selectedOption.join(", ");
  };

  const getLabelByValue = (value: string | number) => {
    return (options as TypeLabeledValue[]).find((el) => el.value === value)?.label;
  };

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
          children: <Icon name="chevronDown" />,
        }}
        {...props}
        className={`${props.className} ${styles.container} ${disabled && styles.disabled}`}
      />
      {isOpen && (
        <FlexElement
          ref={dropdownRef}
          style={{ ...targetPosition }}
          className={`${popupClassName} ${styles.selectDropdown}`}
          direction="vertical"
          alignment="leftTop"
          gap={0}
        >
          {options.map((option) => {
            const optionValue = typeof option === "object" ? option.value : option;
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
                dimensionX={containerRef.current?.offsetWidth}
                key={optionValue.toString()}
                multiple={multiple}
                option={option}
                selected={selected}
                onSelect={handleOptionSelect}
                {...optionProps}
              />
            );
          })}
        </FlexElement>
      )}
    </>
  );
};

export default memo(Select);
