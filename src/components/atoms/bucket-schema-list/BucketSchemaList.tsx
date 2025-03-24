import React, { FC, JSX, memo, useState } from "react";
import BucketSchemaItem from "@atoms/bucket-schema-item/BucketSchemaItem";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./BucketSchemaList.module.scss";
import { TypeInputType } from "@custom-hooks/useInputRepresenter";

type TypeSchema = {
  type: TypeInputType;
  title: string;
  properties?: Record<string, TypeSchema>;
  description?: string;
  minimum?: number;
  maximum?: number;
  items?: TypeSchema;
  default?: any;
  options?: Record<string, any>;
};

type TypeBucketSchemaList = {
  schema?: Record<string, TypeSchema>;
  itemDepth?: number;
} & TypeFlexElement;

const BucketSchemaList: FC<TypeBucketSchemaList> = ({ schema, itemDepth = 0, ...props }) => {
  const [items, setItems] = useState(Object.entries(schema || {}));

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData("index"));

    if (draggedIndex === targetIndex) return;

    const newItems = [...items];
    const draggedItem = newItems.splice(draggedIndex, 1)[0];
    newItems.splice(targetIndex, 0, draggedItem);

    setItems(newItems);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderSchemaItems = (schema: Record<string, TypeSchema>, depth: number): JSX.Element[] => {
    return Object.entries(schema).map(([key, value], index) => {
      const { type, title, properties, items, default: defaultValue, options } = value;
      const isObject = type === "object";
      const isArray = type === "array";
      const addIcon = isObject || isArray;

      return (
        <BucketSchemaItem
          key={key}
          label={title}
          type={type}
          itemDepth={depth}
          defaultValue={defaultValue}
          options={options}
          addIcon={addIcon}
          index={index}
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        />
      );
    });
  };

  return (
    <FlexElement
      direction="vertical"
      gap={10}
      {...props}
      className={`${styles.container} ${props.className}`}
    >
      {renderSchemaItems(Object.fromEntries(items), itemDepth)}
    </FlexElement>
  );
};

export default memo(BucketSchemaList);
