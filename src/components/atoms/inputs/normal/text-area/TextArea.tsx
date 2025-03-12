import { ChangeEventHandler, FC, memo } from "react";
import FlexElement, { TypeFlexElement } from "../../../flex-element/FlexElement";
import styles from "./TextArea.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import { IconName } from "@utils/iconList";
import InputHeader from "@atoms/input-header/InputHeader";
import Text from "@atoms/text/Text";

type TypeTextArea = {
  value?: string;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    rows?: number;
    cols?: number;
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
              children: icon ? <Icon name={`${icon}`} /> : null,
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
          />
        )}
        <FlexElement
          dimensionX="fill"
          alignment="leftCenter"
          {...textAreaContainerProps}
          className={`${textAreaContainerProps?.className || ""}`}
        >
          <textarea
            {...textAreaProps}
            className={styles.textAreaInput}
            value={value}
            onChange={onChange}
            placeholder={placeholder || ""}
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
