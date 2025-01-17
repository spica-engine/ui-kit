import React, { memo, useState } from "react";

import Icon, { TypeIcon } from "components/atoms/icon/Icon";
import styles from "./BaseInput.module.scss";
import FluidContainer, {
  FluidContainerProps,
} from "components/atoms/fluid-container/FluidContainer";
import Text, { TypeText } from "components/atoms/text/Text";
import { FlexElementProps } from "components/atoms/flex-element/FlexElement";
import Input from "../input/Input";

type InputProps = {
  labelProps?: {
    wrapper?: FlexElementProps;
    container?: FlexElementProps;
    title?: TypeText;
    icon?: TypeIcon;
    iconContainer?: FlexElementProps;
    titleContainer?: FlexElementProps;
  };
  labelContainerProps?: FluidContainerProps;
  inputContainerProps?: {
    input?: React.InputHTMLAttributes<HTMLInputElement>;
    container?: FlexElementProps;
    wrapper?: FlexElementProps;
  };
} & FluidContainerProps;

const BaseInput: React.FC<InputProps> = memo(({
  labelContainerProps,
  labelProps,
  inputContainerProps,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsFocused(true);
  };

  const containerProps = {
    dimensionX: "fill",
    dimensionY: 36,
    alignment: "leftCenter",
    gap: 10,
    className: "",
    ...props,
  } as const;

  const combinedLabelProps = {
    icon: {
      name: "article",
      ...labelProps?.icon,
    },
    title: {
      children: "title",
      variant: "secondary",
      ...labelProps?.title,
    },
    container: {
      gap: 10,
      ...labelProps?.container,
    },
    ...labelProps,
  } as const;

  return (
    <FluidContainer
      ref={containerRef}
      {...containerProps}
      className={`${styles.baseInputContainer} ${
        isFocused ? styles.active : ""
      } ${containerProps.className}`}
      prefix={{
        children: (
          <FluidContainer
            {...combinedLabelProps?.container}
            className={`${styles.labelContainer} ${labelProps?.wrapper?.className}`}
            prefix={{
              children: combinedLabelProps?.icon && (
                <Icon
                  {...combinedLabelProps.icon}
                  className={`${styles.activeIcon} ${combinedLabelProps.icon?.className}`}
                />
              ),
              ...combinedLabelProps?.iconContainer,
            }}
            root={{
              children: combinedLabelProps?.title && (
                <Text
                  {...combinedLabelProps?.title}
                  className={`${styles.label} ${styles.activeText} ${combinedLabelProps?.title?.className}`}
                >
                  {combinedLabelProps?.title?.children}
                </Text>
              ),
              ...combinedLabelProps?.titleContainer,
            }}
          />
        ),
        ...combinedLabelProps?.wrapper,
      }}
      root={{
        children: (
          <Input
            inputProps={{...inputContainerProps?.input, placeholder:""}}
            {...inputContainerProps?.container}
            isFocused={isFocused}
          />
        ),
        ...inputContainerProps?.wrapper,
      }}
      onClick={handleClick}
    />
  );
});

export default BaseInput;
