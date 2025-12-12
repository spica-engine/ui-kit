import Popover from "@atoms/popover/Popover";
import React, { FC, JSX, memo, useCallback, useEffect, useState } from "react";
import RichText from "../../normal/rich-text/RichText";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./RichText.module.scss";

export type TypeRichTextMinimized = {
  value?: string;
  richTextProps?: TypeFlexElement;
  placeHolder?: string | JSX.Element;
  onChange?: (value: string) => void;
} & TypeFlexElement;

const MinimizedRichTextInput: FC<TypeRichTextMinimized> = ({
  value,
  richTextProps,
  placeHolder,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const hasContent = localValue && localValue.trim() !== "" && localValue !== "<p></p>";

  return (
    <Popover
      content={
        <RichText
          value={localValue}
          contentProps={richTextProps}
          placeHolder={placeHolder}
          onChange={handleChange}
        />
      }
      containerProps={{ dimensionX: "fill" }}
    >
      <FlexElement
        dimensionX="fill"
        alignment="leftCenter"
        className={styles.richTextMinimized}
        {...props}
      >
        {hasContent ? (
          <div
            className={styles.richTextContent}
            dangerouslySetInnerHTML={{ __html: localValue || "" }}
          />
        ) : (
          <div className={styles.richTextContent}>
            {typeof placeHolder === "string" ? (
              <span className={styles.placeholder}>{placeHolder}</span>
            ) : (
              placeHolder
            )}
          </div>
        )}
      </FlexElement>
    </Popover>
  );
};

export default memo(MinimizedRichTextInput);
