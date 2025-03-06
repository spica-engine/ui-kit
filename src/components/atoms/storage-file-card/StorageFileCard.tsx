import { FC, memo } from "react";
import styles from "./StorageFileCard.module.scss";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import useFileView from "@custom-hooks/useFileView";
import { TypeFile } from "@utils/interface";
import Text, { TypeText } from "../text/Text";

export type TypeStorageFileCard = {
  file: TypeFile;
  viewProps?: TypeFlexElement;
  nameProps?: TypeText;
};

const StorageFileCard: FC<TypeStorageFileCard & TypeFlexElement> = ({
  file,
  viewProps,
  nameProps,
  ...props
}) => {
  const fileView = useFileView({ file });

  return (
    <FlexElement
      direction="vertical"
      gap={10}
      dimensionX={200}
      dimensionY={200}
      {...props}
      className={`${props.className} ${styles.container}`}
    >
      <FlexElement
        alignment="center"
        dimensionX={"fill"}
        {...viewProps}
        className={`${viewProps?.className} ${styles.viewContainer}`}
      >
        {fileView}
      </FlexElement>
      <FlexElement
        dimensionX="fill"
        alignment="center"
        className={`${nameProps?.className} ${styles.name}`}
      >
        <Text {...nameProps}>{file.name}</Text>
      </FlexElement>
    </FlexElement>
  );
};

export default memo(StorageFileCard);
