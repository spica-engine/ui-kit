import { ChangeEventHandler, FC, memo, useImperativeHandle, useRef } from "react";
import FlexElement, { TypeFlexElement } from "../../../flex-element/FlexElement";
import styles from "./TextArea.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import { IconName } from "@utils/iconList";
import InputHeader from "@atoms/input-header/InputHeader";
import Text from "@atoms/text/Text";

export type TypeTextArea = {
  value?: string;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    rows?: number;
    cols?: number;
    ref?: React.RefObject<HTMLTextAreaElement>;
  };
  textAreaContainerProps?: TypeFlexElement;
  containerProps?: TypeFlexElement;
  titlePrefixProps?: TypeFlexElement;
  titleRootProps?: TypeFlexElement;
  titleSuffixProps?: TypeFlexElement;
  titleContainerProps?: TypeFluidContainer;
  title?: string;
  icon?: IconName;
  description?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

const TextAreaInput: FC<TypeTextArea> = ({
  value,
  title = "",
  icon,
  textAreaProps,
  textAreaContainerProps,
  titleContainerProps,
  titlePrefixProps,
  titleRootProps,
  titleSuffixProps,
  containerProps,
  description,
  placeholder,
  onChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    textAreaRef.current?.focus();
    try {
      titleContainerProps?.onClick?.(e);
    } catch (error) {
      console.error("Error in titleContainerProps.onClick:", error);
    }
  };

  useImperativeHandle(
    textAreaProps?.ref ?? { current: null },
    () => textAreaRef.current as HTMLTextAreaElement
  );

  return (
    <FlexElement
      dimensionX="fill"
      alignment="leftCenter"
      direction="vertical"
      {...containerProps}
      className={`${styles.container} ${containerProps?.className || ""}`}
    >
      <>
        {(title || icon || titlePrefixProps || titleSuffixProps) && (
          <InputHeader
            dimensionX={"fill"}
            dimensionY={36}
            alignment={"leftCenter"}
            {...titleContainerProps}
            className={`${styles.titleContainer} ${titleContainerProps?.className || ""}`}
            prefix={{
              children: icon ? <Icon name={icon} className={styles.icon} /> : null,
              dimensionX: "hug",
              alignment: "leftCenter",
              ...titlePrefixProps,
            }}
            root={{
              children: title,
              dimensionX: "fill",
              alignment: "leftCenter",
              ...titleRootProps,
            }}
            suffix={{
              children: titleSuffixProps?.children,
              dimensionX: "hug",
              alignment: "rightCenter",
              ...titleSuffixProps,
            }}
            onClick={handleLabelClick}
          />
        )}
        <FlexElement
          dimensionX="fill"
          alignment="leftCenter"
          {...textAreaContainerProps}
          className={`${textAreaContainerProps?.className || ""}`}
        >
          <textarea
            className={styles.textAreaInput}
            value={value}
            onChange={onChange}
            placeholder={placeholder || ""}
            ref={textAreaRef}
            {...textAreaProps}
          ></textarea>
        </FlexElement>
      </>
      <Text size="xsmall" className={`${styles.description}`}>
        {description}
      </Text>
    </FlexElement>
  );
};

export default memo(TextAreaInput);
