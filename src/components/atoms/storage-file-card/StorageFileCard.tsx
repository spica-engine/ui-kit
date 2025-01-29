import { FC, memo } from "react";
import styles from "./StorageFileCard.module.scss";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import Text from "../text/Text";
import Icon from "../icon/Icon";

export type TypeStorageFileCard = {
  name: string;
  contentType: string;
  url: string;
  viewProps?: TypeFlexElement;
  nameProps?: TypeFlexElement;
};

const contentTypeMapping = [
  { regex: /^image\//, viewer: (url: string, name?: string) => <img src={url} alt={name} /> },
  { regex: /^video\//, viewer: () => <Icon name="movie" className={styles.icon} /> },
  {
    regex: /^(text\/plain|text\/javascript|application\/json)$/,
    viewer: (url: string, contentType: string) => <embed type={contentType} src={url} />,
  },
  {
    regex: /^(application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|text\/csv)$/,
    viewer: () => <Icon name="gridOn" className={styles.icon} />,
  },
  {
    regex: /^application\/pdf/,
    viewer: (url: string, contentType: string) => <embed type={contentType} src={url} />,
  },
  { regex: /^application\/zip/, viewer: () => <Icon name="folderZip" className={styles.icon} /> },
];

const StorageFileCard: FC<TypeStorageFileCard & TypeFlexElement> = ({
  name,
  url,
  contentType,
  viewProps,
  nameProps,
  ...props
}) => {
  const renderContentView = () => {
    const match = contentTypeMapping.find(({ regex }) => regex.test(contentType));
    if (match) {
      return match.viewer(url || "", contentType);
    }

    return <Icon name="fileDocument" className={styles.icon} />;
  };

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
        {renderContentView()}
      </FlexElement>
      <Text dimensionX="fill" {...nameProps} className={`${nameProps?.className} ${styles.name}`}>
        {name}
      </Text>
    </FlexElement>
  );
};

export default memo(StorageFileCard);
