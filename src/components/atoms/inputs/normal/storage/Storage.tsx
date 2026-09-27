import { CSSProperties, FC, memo, ReactNode } from "react";
import styles from "./Storage.module.scss";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Dropzone from "react-dropzone";
import Text, { TypeText } from "@atoms/text/Text";
import { IconName } from "@utils/iconList";
import useFileView from "@custom-hooks/useFileView";
import { TypeFile } from "@utils/interface";

export type TypeStorageInput = {
  label?: string;
  file?: TypeFile;
  containerProps?: TypeFlexElement;
  dropzoneContainerProps?: {
    uploadIcon?: IconName;
    previewIcon?: IconName;
    description?: ReactNode;
  };
  description?: string;
  errorMessage?: string;
  helperTextProps?: TypeText;
  onUpload?: (file: File) => void;
  onPreview?: () => void;
  onClickShowFileSelect?: () => void;
};

const StorageInput: FC<TypeStorageInput> = ({
  file,
  label,
  containerProps,
  dropzoneContainerProps,
  description,
  errorMessage,
  helperTextProps,
  onClickShowFileSelect,
  onUpload,
  onPreview,
}) => {
  const imgEmbedStyles: CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    objectFit: "contain",
  };

  const fileView = useFileView({
    file,
    styles: {
      img: imgEmbedStyles,
      embed: imgEmbedStyles,
    },
  });

  return (
    <FlexElement
      direction="vertical"
      alignment="leftTop"
      dimensionX="fill"
      {...containerProps}
      className={`${styles.field} ${containerProps?.className ?? ""}`}
    >
      {label && (
        <div className={styles.fieldHead}>
          <div className={styles.fieldName}>
            <Icon className={styles.icon} name="storage" />
            <span>{label}</span>
          </div>
          <span className={styles.fieldType}>storage</span>
        </div>
      )}
      <Dropzone
        multiple={false}
        onDrop={(acceptedFiles) => {
          if (!acceptedFiles.length) return;
          onUpload?.(acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={`${styles.storage} ${file ? styles.hasFile : ""}`}
            {...getRootProps()}
            onClick={() => {
              if (file?.url) {
                onPreview?.();
              } else {
                onClickShowFileSelect?.();
              }
            }}
          >
            {file ? (
              <>
                {fileView}
                <Icon
                  name={dropzoneContainerProps?.previewIcon || "filterCenterFocus"}
                  size={32}
                  className={styles.previewIcon}
                />
              </>
            ) : (
              <>
                <Icon
                  name={dropzoneContainerProps?.uploadIcon || "storage"}
                  className={styles.uploadIcon}
                />
                <span>
                  {dropzoneContainerProps?.description ??
                    "Upload one image or pick an image from library"}
                </span>
              </>
            )}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {(errorMessage || description) && (
        <Text
          {...helperTextProps}
          size="xsmall"
          variant={errorMessage ? "danger" : "secondary"}
        >
          {errorMessage || description}
        </Text>
      )}
    </FlexElement>
  );
};

export default memo(StorageInput);
