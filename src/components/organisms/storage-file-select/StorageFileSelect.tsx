import { FC, memo } from "react";
import styles from "./StorageFileSelect.module.scss";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Modal from "components/atoms/modal/Modal";
import Button from "components/atoms/button/Button";
import StorageFileCard from "components/atoms/storage-file-card/StorageFileCard";
import Popover from "components/atoms/popover/Popover";
import SortPopoverContent, { TypeSortProp } from "./sort-popover-content/SortPopoverContent";

type TypeFile = {
  id: string;
  name: string;
  contentType: string;
  url: string;
};

type TypeStorageFileSelect = {
  data: TypeFile[];
  className?: string;
  onClickSort?: (prop: TypeSortProp) => void;
  onChooseFiles?: (file: TypeFile) => void;
};

const StorageFileSelect: FC<TypeStorageFileSelect> = ({ data, onClickSort, onChooseFiles }) => {
  const handleClickSortProp = (prop: TypeSortProp) => {
    onClickSort?.(prop);
  };

  const handleClickFile = (file: TypeFile) => {
    onChooseFiles?.(file);
  };

  return (
    <Modal showCloseButton={false} className={styles.container} dimensionX="fill">
      <Modal.Header
        suffix={{
          dimensionX: "fill",
          children: (
            <FluidContainer
              dimensionX="fill"
              alignment="rightCenter"
              className={styles.actions}
              prefix={{
                children: (
                  <Button color="transparent" variant="filled">
                    <Icon name="gridView" />
                  </Button>
                ),
              }}
              root={{
                children: (
                  <Button color="transparent" variant="filled">
                    <Icon name="viewList" />
                  </Button>
                ),
              }}
              suffix={{
                children: (
                  <Popover
                    content={<SortPopoverContent onClick={handleClickSortProp} />}
                    placement="bottomEnd"
                    trigger="click"
                  >
                    <Button color="transparent" variant="filled">
                      <Icon name="sort" />
                    </Button>
                  </Popover>
                ),
              }}
            />
          ),
        }}
      ></Modal.Header>
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
