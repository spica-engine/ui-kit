import React, { FC, memo } from "react";
import Popover from "../popover/Popover";
import FluidContainer from "../fluid-container/FluidContainer";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import FlexElement from "../flex-element/FlexElement";
import { IconName } from "utils/iconList";
import styles from "./BucketFieldPopup.module.scss";

type TypeBucketFieldPopup = {
  content: React.ReactNode;
};

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

const BucketFieldPopup: FC<TypeBucketFieldPopup> = ({ content }) => {
  return (
    <Popover
      content={
        <FlexElement dimensionX={200} direction="vertical" className={styles.container}>
          {fieldOptions.map(({ icon, text }) => (
            <FluidContainer
              dimensionX="fill"
              gap={10}
              key={icon}
              prefix={{ children: <Icon name={icon} /> }}
              root={{ children: <Text>{text}</Text> }}
              onClick={() => {}}
              className={styles.item}
            />
          ))}
        </FlexElement>
      }
      containerProps={{ className: styles.popover }}
    >
      {content}
    </Popover>
  );
};

export default memo(BucketFieldPopup);
