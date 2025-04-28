import { BaseInput, Button, ChipInput, Icon, Text } from "index.export";
import React, { FC, useEffect, useState } from "react";
import styles from "./RelationInput.module.scss";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";

type TypeRelationInput = {
  label: string;
  value: string[];
  description?: string;
  onChange?: () => void;
  inputContainerClassName?: string;
};

const RelationInput: FC<TypeRelationInput & TypeFlexElement> = ({
  label,
  value = [],
  description,
  onChange,
  inputContainerClassName,
  ...props
}) => {
  const [chips, setChips] = useState<string[]>(value);

  useEffect(() => {
    setChips(value);
  }, [value]);

  const handleDeleteAll = () => {
    setChips([]);
  };

  return (
    <BaseInput
      dimensionX="fill"
      labelProps={{
        dimensionX: "hug",
        divider: true,
        prefix: {
          children: <Icon className={styles.icon} name="callMerge" />,
        },
        root: {
          dimensionX: "hug",
          children: (
            <Text className={styles.text} size="medium">
              {label}
            </Text>
          ),
        },
      }}
    >
      <>
        <ChipInput
          className={styles.chipInput}
          key={chips.length}
          placeholder=""
          mode="readonly"
          staticChips={chips}
          onChange={onChange}
        />
        <Button
          className={styles.deleteButton}
          variant="icon"
          color="danger"
          onClick={handleDeleteAll}
        >
          <Icon name="delete" />
        </Button>
      </>
    </BaseInput>
  );
};

export default RelationInput;
