import React, { FC, memo } from "react";
import Icon from "../icon/Icon";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import { IconName } from "utils/iconList";
import styles from "./BucketFieldPopup.module.scss";
import ListItem from "../list-item/ListItem";

const fieldOptions: { icon: IconName; text: string }[] = [
  { icon: "formatQuoteClose", text: "String" },
  { icon: "numericBox", text: "Number" },
  { icon: "calendarBlank", text: "Date" },
  { icon: "checkboxBlankOutline", text: "Boolean" },
  { icon: "formatListChecks", text: "Multiple Selection" },
  { icon: "callMerge", text: "Relation" },
  { icon: "mapMarker", text: "Location" },
  { icon: "ballot", text: "Array" },
  { icon: "dataObject", text: "Object" },
  { icon: "imageMultiple", text: "File" },
  { icon: "formatAlignCenter", text: "RichText" },
];

const BucketFieldPopup: FC<TypeFlexElement> = () => {
  return (
    <FlexElement dimensionX={200} direction="vertical" className={styles.container}>
      {fieldOptions.map(({ icon, text }) => (
        <ListItem
          label={text}
          dimensionX="fill"
          dimensionY="hug"
          gap={10}
          prefix={{ children: <Icon name={icon} /> }}
          onClick={() => {}}
          className={styles.item}
        />
      ))}
    </FlexElement>
  );
};

export default memo(BucketFieldPopup);
