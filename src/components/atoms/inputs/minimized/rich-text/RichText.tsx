import Popover from "@atoms/popover/Popover";
import React, { FC, JSX, memo, useCallback, useEffect, useState } from "react";
import RichText from "../../normal/rich-text/RichText";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./RichText.module.scss";
import { Button } from "index.export";

export type TypeRichTextMinimized = {
  value?: string;
  richTextProps?: TypeFlexElement;
  placeHolder?: string | JSX.Element;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onSave?: (value: string) => void;
} & TypeFlexElement;

const MinimizedRichTextInput: FC<TypeRichTextMinimized> = ({
  value,
  richTextProps,
  placeHolder,
  onChange,
  onCancel,
  onSave,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLocalValue(value ?? "");
    }
  }, [isOpen, value]);

  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue);
  }, []);

  const handleOpen = useCallback(() => {
    setLocalValue(value ?? "");
    setIsOpen(true);
  }, [value]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setLocalValue(value ?? "");
  }, [value]);

  const handleCancel = useCallback(() => {
    handleClose();
    onCancel?.();
  }, [handleClose, onCancel]);

  const handleSave = useCallback(() => {
    onChange?.(localValue);
    setIsOpen(false);
    onSave?.(localValue);
  }, [localValue, onChange, onSave]);

  const hasContent = value && value.trim() !== "" && value !== "<p></p>";

  const { onClick, ...flexProps } = props;

  const handleContainerClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onClick?.(event);
      handleOpen();
    },
    [handleOpen, onClick]
  );

  return (
    <Popover
      content={
        <FlexElement direction="vertical" gap={10}>
          <RichText
            value={localValue}
            contentProps={richTextProps}
            placeHolder={placeHolder}
            onChange={handleChange}
          />
          <FlexElement dimensionX="fill" alignment="rightBottom" gap={10}>
            <Button variant="filled" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="solid" onClick={handleSave}>
              Save
            </Button>
          </FlexElement>
        </FlexElement>
      }
      containerProps={{ dimensionX: "fill" }}
      open={isOpen}
      onClose={handleClose}
    >
      <FlexElement
        dimensionX="fill"
        alignment="leftCenter"
        className={styles.richTextMinimized}
        onClick={handleContainerClick}
        {...flexProps}
      >
        {hasContent ? (
          <div
            className={styles.richTextContent}
            dangerouslySetInnerHTML={{ __html: value || "" }}
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
