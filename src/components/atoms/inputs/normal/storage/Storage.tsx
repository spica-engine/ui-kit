import { FC, memo, ReactNode } from "react";
import styles from "./Storage.module.scss";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Icon from "components/atoms/icon/Icon";
import Dropzone from "react-dropzone";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Text from "components/atoms/text/Text";
import IconButton from "components/atoms/icon-button/IconButton";
import { IconName } from "utils/iconList";

export type TypeStorageInput = {
  label?: string;
  fileLink?: string;
  containerProps?: TypeFlexElement;
  topContainerProps?: {
    container?: TypeFluidContainer;
    root?: TypeFlexElement;
    rootChildren?: TypeFlexElement;
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
  onUpload: (file: File) => any;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPreview?: () => void;
};

const StorageInput: FC<TypeStorageInput> = memo(
  ({
    fileLink,
    label,
    containerProps,
    topContainerProps,
    dropzoneContainerProps,
    onUpload,
    onDelete,
    onPreview,
  }) => {
    const handleClickEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

    const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onDelete?.(event);
    };

    return (
      <FlexElement
        className={`${containerProps?.className} ${styles.container}`}
        direction="vertical"
        dimensionY={472}
        dimensionX={"fill"}
        alignment="top"
        gap={10}
        {...containerProps}
      >
        <>
          <FluidContainer
            dimensionX={"fill"}
            dimensionY={36}
            className={`${topContainerProps?.container?.className} ${styles.top}`}
            {...topContainerProps?.container}
            root={{
              children: label && <Text {...topContainerProps?.rootChildren}>{label}</Text>,
              dimensionX: "fill",
              alignment: "leftCenter",
              ...topContainerProps?.root,
            }}
            suffix={{
              children: !topContainerProps?.hideActions ? (
                <>
                  <IconButton
                    buttonProps={{
                      onClick: handleClickEdit,
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
          />
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {
              if (!acceptedFiles.length) return;
              onUpload(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => {
              const rootProps = getRootProps();
              const handleClick = (event: any) => {
                if (!fileLink) {
                  rootProps.onClick?.(event);
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
                  style={{ backgroundImage: `url(${fileLink})` }}
                  {...getRootProps()}
                  {...dropzoneContainerProps?.container}
                  onClick={handleClick}
                >
                  <>
                    {fileLink ? (
                      <Icon name={dropzoneContainerProps?.previewIcon || "eye"} />
                    ) : (
                      <>
                        <Icon name={dropzoneContainerProps?.uploadIcon || "storage"} />
                        <Text>
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
        </>
      </FlexElement>
    );
  }
);

export default StorageInput;
