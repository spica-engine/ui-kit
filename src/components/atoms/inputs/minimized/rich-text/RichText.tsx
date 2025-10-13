import Popover from "@atoms/popover/Popover";
import React, { FC, JSX } from "react";
import RichText, { TypeRichTextInput } from "../../normal/rich-text/RichText";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import styles from "./RichText.module.scss";

export type TypeRichTextMinimized = {
  value?: string;
  richTextProps?: TypeFlexElement;
  placeHolder?: string | JSX.Element;
} & TypeFlexElement;

const MinimizedRichTextInput: FC<TypeRichTextMinimized> = ({
  value,
  richTextProps,
  placeHolder,
  ...props
}) => {
  return (
    <Popover
      content={<RichText value={value} contentProps={richTextProps} placeHolder={placeHolder} />}
      containerProps={{ dimensionX: "fill" }}
    >
      <FlexElement
        dimensionX="fill"
        alignment="leftCenter"
        className={styles.richTextMinimized}
        {...props}
      >
        <Text>{value}</Text>
      </FlexElement>
    </Popover>
  );
};

export default MinimizedRichTextInput;
