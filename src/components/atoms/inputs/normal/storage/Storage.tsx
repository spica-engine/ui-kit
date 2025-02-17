import { CSSProperties, FC, memo, ReactNode } from "react";
import styles from "./Storage.module.scss";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Icon from "components/atoms/icon/Icon";
import Dropzone from "react-dropzone";
import { TypeFluidContainer } from "components/atoms/fluid-container/FluidContainer";
import Text, { TypeText } from "components/atoms/text/Text";
import IconButton from "components/atoms/icon-button/IconButton";
import { IconName } from "utils/iconList";
import InputGroup from "components/atoms/base-input/InputGroup";
import InputHeader from "components/atoms/input-header/InputHeader";
import useFileView from "custom-hooks/useFileView";
import { TypeFile } from "utils/interface";

export type TypeStorageInput = {
  label?: string;
  file?: TypeFile;
  containerProps?: TypeFlexElement;
  topContainerProps?: {
    container?: TypeFluidContainer;
    root?: TypeFlexElement;
    rootChildren?: TypeText;
    suffix?: TypeFlexElement;
    suffixChildren?: TypeFlexElement;
    editIcon?: IconName;
    deleteIcon?: IconName;
    hideActions?: boolean;
    disableEditIcon?: boolean;
    disableDeleteIcon?: boolean;
  };
  dropzoneContainerProps?: {
    container?: TypeFlexElement;
    uploadIcon?: IconName;
    previewIcon?: IconName;
    description?: ReactNode;
  };
  description?: string;
  errorMessage?: string;
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeText;
  onUpload?: (file: File) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPreview?: () => void;
  onClickShowFileSelect?: () => void;
};

const StorageInput: FC<TypeStorageInput> = ({
  file,
  label,
  containerProps,
  topContainerProps,
  dropzoneContainerProps,
  description,
  errorMessage,
  helperTextContainerProps,
  helperTextProps,
  onClickShowFileSelect,
  onUpload,
  onDelete,
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

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onDelete?.(event);
  };

  return (
    <FlexElement
      direction="vertical"
      dimensionX="fill"
      dimensionY={472}
      alignment="top"
      gap={10}
      className={`${containerProps?.className}`}
    >
      <FlexElement
        direction="vertical"
        dimensionX="fill"
        gap={10}
        className={`${containerProps?.className} ${styles.container}`}
      >
        <InputHeader
          prefix={{ children: <Icon name="storage" className={styles.icon} /> }}
          root={{ children: <Text variant="secondary">{label}</Text> }}
          suffix={{
            children: !topContainerProps?.hideActions ? (
              <>
                <IconButton
                  buttonProps={{
                    onClick: onClickShowFileSelect,
                    disabled: topContainerProps?.disableEditIcon,
                  }}
                  icon={topContainerProps?.editIcon || "pencil"}
                  variant="base"
                />
                <IconButton
                  buttonProps={{
                    onClick: handleClickDelete,
                    disabled: topContainerProps?.disableDeleteIcon,
                  }}
                  icon={topContainerProps?.deleteIcon || "delete"}
                  variant="dangerBase"
                />
              </>
            ) : null,
            gap: 0,
            ...topContainerProps?.suffix,
          }}
          {...topContainerProps?.container}
        />
        <Dropzone
          multiple={false}
          onDrop={(acceptedFiles) => {
            if (!acceptedFiles.length) return;
            onUpload?.(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => {
            const handleClick = (event: any) => {
              if (!file?.url) {
                onClickShowFileSelect?.();
                return;
              }

              onPreview?.();
            };

            return (
              <FlexElement
                className={`${dropzoneContainerProps?.container?.className} ${styles.storage}`}
                alignment="center"
                dimensionX={"fill"}
                dimensionY={407}
                direction="vertical"
                gap={10}
                {...getRootProps()}
                {...dropzoneContainerProps?.container}
                onClick={handleClick}
              >
                <>
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
                      <Icon name={dropzoneContainerProps?.uploadIcon || "storage"} size={80} />
                      <Text className={styles.text}>
                        {dropzoneContainerProps?.description || (
                          <span>
                            Upload your file or <br /> pick an file from storage
                          </span>
                        )}
                      </Text>
                    </>
                  )}
                  <input {...getInputProps()} />
                </>
              </FlexElement>
            );
          }}
        </Dropzone>
      </FlexElement>
      <InputGroup.HelperText
        alignment="leftCenter"
        dimensionX="fill"
        {...helperTextContainerProps}
        className={`${styles.helperText} ${helperTextContainerProps?.className}`}
      >
        <Text
          {...helperTextProps}
          size="small"
          variant={errorMessage ? "danger" : "secondary"}
          className={`${helperTextProps?.className}`}
        >
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </FlexElement>
  );
};

export default memo(StorageInput);
