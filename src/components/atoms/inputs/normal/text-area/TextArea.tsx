import { ChangeEventHandler, FC, memo } from "react";
import FlexElement, { TypeFlexElement } from "../../../flex-element/FlexElement";
import styles from "./TextArea.module.scss";
import { TypeFluidContainer } from "../../../../../components/atoms/fluid-container/FluidContainer";
import Icon from "../../../../../components/atoms/icon/Icon";
import { IconName } from "../../../../../utils/iconList";
import InputHeader from "../../../../../components/atoms/input-header/InputHeader";
import Text from "../../../../../components/atoms/text/Text";

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
  onChange,
}) => {
  const mergedTextAreaContainerProps = {
    dimensionX: "fill",
    alignment: "leftCenter",
    ...textAreaContainerProps,
  } as const;
  const mergedTitleContainerProps = {
    dimensionX: "fill",
    dimensionY: 36,
    alignment: "leftCenter",
    ...titleContainerProps,
  } as const;
  const mergedTitlePrefixProps = {
    dimensionX: "hug",
    alignment: "leftCenter",
    ...titlePrefixProps,
  } as const;
  const mergedTitleRootProps = {
    dimensionX: "fill",
    alignment: "leftCenter",
    ...titleRootProps,
  } as const;
  const mergedTitleSuffixProps = {
    dimensionX: "hug",
    alignment: "rightCenter",
    ...titleSuffixProps,
  } as const;
  const mergedContainerProps = {
    dimensionX: "fill",
    alignment: "leftCenter",
    direction: "vertical",
    ...containerProps,
  } as const;

  return (
    <FlexElement className={styles.textAreaInputContainer} {...mergedContainerProps}>
      <>
        {(title || icon || titlePrefixProps || titleSuffixProps) && (
          <InputHeader
            {...mergedTitleContainerProps}
            prefix={{
              children: icon ? <Icon name={`${icon}`} /> : null,
              ...mergedTitlePrefixProps,
            }}
            root={{
              children: title,
              ...mergedTitleRootProps,
            }}
            suffix={{
              children: titleSuffixProps?.children,
              ...mergedTitleSuffixProps,
            }}
            className={styles.textAreaTitle}
          />
        )}
        <FlexElement className={styles.textAreaInput} {...mergedTextAreaContainerProps}>
          <textarea
            {...textAreaProps}
            className={styles.textArea}
            value={value}
            onChange={onChange}
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
