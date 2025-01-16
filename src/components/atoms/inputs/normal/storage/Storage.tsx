import { FC, memo } from "react";
import styles from "./Storage.module.scss";
import FlexElement from "components/atoms/flex-element/FlexElement";
import Icon from "components/atoms/icon/Icon";
import Dropzone from "react-dropzone";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Text from "components/atoms/text/Text";

export type TypeStorageInput = {
  label?: string;
  fileLink?: string;
  onFileUpload: (file: File) => any;
};

const StorageInput: FC<TypeStorageInput> = memo(({ fileLink, label, onFileUpload }) => {
  return (
    <FlexElement
      className={`${styles.container}`}
      direction="vertical"
      dimensionY={472}
      dimensionX={"fill"}
      alignment="top"
      gap={10}
    >
      <>
        <FluidContainer
          dimensionX={"fill"}
          dimensionY={36}
          className={styles.top}
          root={{
            children: label && <Text>{label}</Text>,
            dimensionX: "fill",
            alignment: "leftCenter",
          }}
          suffix={{
            children: (
              <FlexElement>
                <>
                  <Icon name="eye" />
                  <Icon name="eye" />
                </>
              </FlexElement>
            ),
          }}
        />
        <Dropzone
          multiple={false}
          onDrop={(acceptedFiles) => {
            if (!acceptedFiles.length) return;
            onFileUpload(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexElement
              className={`${styles.storage}`}
              alignment="center"
              dimensionX={"fill"}
              dimensionY={407}
              direction="vertical"
              gap={10}
              style={{
                backgroundImage: `url(${fileLink})`,
              }}
              {...getRootProps()}
            >
              <>
                <Icon name="storage" />
                <Text>
                  <span>
                    Upload your file or <br /> pick an file from storage
                  </span>
                </Text>
                <input {...getInputProps()} />
              </>
            </FlexElement>
          )}
        </Dropzone>
      </>
    </FlexElement>
  );
});

export default StorageInput;
