import { FC, memo, useEffect, useState } from "react";
import styles from "./StorageFileSelect.module.scss";
import Modal from "components/atoms/modal/Modal";
import StorageFileCard from "components/atoms/storage-file-card/StorageFileCard";
import { TypeSortProp } from "./sort-popover-content/SortPopoverContent";
import StorageModalHeading from "./storage-modal-heading/StorageModalHeading";

type TypeFile = {
  id: string;
  name: string;
  contentType: string;
  url: string;
};

type TypeStorageFileSelect = {
  data: TypeFile[];
  className?: string;
  onChangeSearch?: (search: string) => void;
  onClickSort?: (prop: TypeSortProp) => void;
  onChooseFiles?: (file: TypeFile) => void;
};

const StorageFileSelect: FC<TypeStorageFileSelect> = ({
  data,
  onChangeSearch,
  onClickSort,
  onChooseFiles,
}) => {
  const [directory, setDirectory] = useState(["/"]);
  const [fileLength, setFileLength] = useState(0);
  const [folderLength, setFolderLength] = useState(0);

  const handleClickSortProp = (prop: TypeSortProp) => {
    onClickSort?.(prop);
  };

  const handleClickFile = (file: TypeFile) => {
    onChooseFiles?.(file);
  };

  const handleChangeDirectory = (index: number) => {
    setDirectory(directory.slice(0, index + 1));
  };

  useEffect(() => {
    // TODO Should calculate file and folder length
  }, [data]);

  return (
    <Modal showCloseButton={false} className={styles.container} dimensionX="fill">
      <Modal.Header
        dimensionY="hug"
        root={{
          dimensionX: "fill",
          children: (
            <StorageModalHeading
              fileLength={fileLength}
              folderLength={folderLength}
              onClickSort={handleClickSortProp}
              directory={directory}
              onChangeDirectory={handleChangeDirectory}
              onChangeSearch={onChangeSearch}
            />
          ),
        }}
      />
      <Modal.Body gap={12} className={styles.content}>
        {data.map((el) => (
          <StorageFileCard
            onClick={() => handleClickFile(el)}
            dimensionX="fill"
            dimensionY="fill"
            key={el.id}
            name={el.name}
            contentType={el.contentType}
            url={el.url}
            className={styles.file}
          />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default memo(StorageFileSelect);
