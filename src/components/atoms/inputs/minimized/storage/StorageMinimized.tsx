import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import { FC, useRef } from "react";
import styles from "./StorageMinimized.module.scss";
import Button from "components/atoms/button/Button";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import Dropzone from "react-dropzone";
import FlexElement from "components/atoms/flex-element/FlexElement";
import { TypeFile } from "utils/interface";

type TypeStorageMinimized = {
  file?: TypeFile;
  placeholder?: string;
  onUpload?: (file: File) => void;
  onClickShowFileSelect?: () => void;
  onDelete?: () => void;
} & TypeFluidContainer;

const StorageMinimized: FC<TypeStorageMinimized> = ({
  file,
  placeholder = "Click or Drag & Drop",
  onUpload,
  onClickShowFileSelect,
  onDelete,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <FluidContainer
      ref={ref}
      alignment="leftCenter"
      dimensionX="fill"
      mode="fill"
      root={{
        children: (
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {
              if (!acceptedFiles.length) return;
              onUpload?.(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => {
              const handleClick = () => {
                onClickShowFileSelect?.();
              };

              return (
                <FlexElement
                  className={styles.storage}
                  alignment="leftCenter"
                  dimensionX="fill"
                  gap={10}
                  {...getRootProps()}
                  onClick={handleClick}
                >
                  <Icon name="storage" size={14} />
                  <Text className={styles.text}>{file ? file.name : placeholder}</Text>
                  <input {...getInputProps()} />
                </FlexElement>
              );
            }}
          </Dropzone>
        ),
      }}
      suffix={{
        children: file && (
          <Button
            variant="icon"
            children={<Icon name="close" />}
            color="transparent"
            onClick={onDelete}
          />
        ),
      }}
      {...props}
      className={`${props.className} ${styles.storageMinimized}`}
    />
  );
};

export default StorageMinimized;
