import { TypeInputType } from "@custom-hooks/useInputRepresenter";
import { Button, FlexElement, FluidContainer, Icon, Text } from "index.export";
import React, { FC, memo } from "react";
import styles from "./BucketSchemaItem.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

type TypeBucketSchemaItem = {
  label?: string;
  type?: TypeInputType | "id";
  addIcon?: boolean;
  addOnClick?: () => void;
  editIcon?: boolean;
  editOnClick?: () => void;
  deleteIcon?: boolean;
  deleteOnClick?: () => void;
  itemDepth?: number;
  options?: Record<string, any>;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, targetIndex: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  immovable?: boolean;
} & TypeFluidContainer;

const BucketSchemaItem: FC<TypeBucketSchemaItem> = ({
  label,
  type,
  addIcon = false,
  addOnClick,
  editIcon = true,
  editOnClick,
  deleteIcon = true,
  deleteOnClick,
  itemDepth,
  index,
  onDragStart,
  onDrop,
  onDragOver,
  ...props
}) => {
  const renderPrefixIcon = () => {
    if (!itemDepth) return null;

    const showEllipsis = itemDepth > 2;

    return (
      <>
        {showEllipsis && <Text style={{ marginLeft: "2px" }}>...</Text>}
        {Array(showEllipsis ? 1 : itemDepth)
          .fill("")
          .map((_, index) => (
            <Icon key={`chevron-${index}`} name="chevronRight" />
          ))}
      </>
    );
  };

  return (
    <FluidContainer
      mode="fill"
      dimensionX={"fill"}
      gap={20}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragOver={onDragOver}
      prefix={{
        className: styles.prefixDiv,
        children: (
          <>
            {itemDepth === 0 && (
              <Button variant="icon" className={`${styles.buttons} ${styles.dragDropButton}`}>
                <Icon name="dragHorizontalVariant" />
              </Button>
            )}

            <FlexElement className={styles.prefixIconDiv}>{renderPrefixIcon()}</FlexElement>
            <Text className={styles.label}>{label}</Text>
          </>
        ),
      }}
      root={{
        alignment: "leftCenter",
        children: <Text>{type}</Text>,
      }}
      suffix={{
        children: (
          <FluidContainer
            className={styles.suffixIcons}
            gap={10}
            prefix={{
              children: addIcon ? (
                <Button variant="icon" className={styles.buttons} onClick={addOnClick}>
                  <Icon name="plus" />
                </Button>
              ) : null,
            }}
            root={{
              children: editIcon ? (
                <Button variant="icon" className={styles.buttons} onClick={editOnClick}>
                  <Icon name="pencil" />
                </Button>
              ) : null,
            }}
            suffix={{
              children: deleteIcon ? (
                <Button
                  variant="icon"
                  color="danger"
                  className={styles.buttons}
                  onClick={deleteOnClick}
                >
                  <Icon name="delete" />
                </Button>
              ) : null,
            }}
          />
        ),
      }}
      {...props}
      className={`${styles.bucketSchemaItem} ${props.className}`}
    />
  );
};

export default memo(BucketSchemaItem);
