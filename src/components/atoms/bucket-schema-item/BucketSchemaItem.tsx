import { TypeInputType } from "@custom-hooks/useInputRepresenter";
import { Button, FlexElement, FluidContainer, Icon, Text } from "index.export";
import React, { FC } from "react";
import styles from "./BucketSchemaItem.module.scss";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

type TypeBucketSchemaItem = {
  label?: string;
  type?: TypeInputType | "id";
  addIcon?: boolean;
  editIcon?: boolean;
  deleteIcon?: boolean;
  itemDepth?: number;
} & TypeFluidContainer;

const BucketSchemaItem: FC<TypeBucketSchemaItem> = ({
  label,
  type,
  addIcon = false,
  editIcon = true,
  deleteIcon = true,
  itemDepth,
  ...props
}) => {
  const renderPrefixIcon = () => {
    if (!itemDepth) return null;

    const maxVisibleIcons = 3;
    const showEllipsis = itemDepth > maxVisibleIcons;
    const IconsToShow = showEllipsis ? maxVisibleIcons : itemDepth;

    return (
      <>
        {Array(IconsToShow)
          .fill("")
          .map((_, index) => (
            <Icon key={`chevron-${index}`} name="chevronRight" />
          ))}
        {showEllipsis && <Text style={{ marginLeft: "-10px" }}>...</Text>}
      </>
    );
  };
  return (
    <FluidContainer
      mode="fill"
      gap={20}
      prefix={{
        children: (
          <>
            <FlexElement className={styles.prefixIconDiv}>{renderPrefixIcon()}</FlexElement>
            <Text className={styles.label}>{label}</Text>
          </>
        ),
      }}
      root={{
        children: <Text>{type}</Text>,
      }}
      suffix={{
        children: (
          <FluidContainer
            gap={10}
            prefix={{
              children: addIcon ? (
                <Button variant="icon" className={styles.buttons}>
                  <Icon name="plus"></Icon>
                </Button>
              ) : null,
            }}
            root={{
              children: editIcon ? (
                <Button variant="icon" color="danger" className={styles.buttons}>
                  <Icon name="pencil"></Icon>
                </Button>
              ) : null,
            }}
            suffix={{
              children: deleteIcon ? (
                <Button variant="icon" className={styles.buttons}>
                  <Icon name="delete"></Icon>
                </Button>
              ) : null,
            }}
          />
        ),
      }}
      {...props}
      className={props.className}
    />
  );
};

export default BucketSchemaItem;
