import String from "@atoms/inputs/normal/string/String";
import { Button, FluidContainer, Icon, Text } from "index.export";
import React, { FC, memo } from "react";
import styles from "./DashboardEditName.module.scss";
type TypeDashboardEditNameProps = {
  name?: string;
  onClickAddNew?: () => void;
};

const DashboardEditName: FC<TypeDashboardEditNameProps> = ({ name, onClickAddNew }) => {
  return (
    <FluidContainer
      className={styles.container}
      direction="vertical"
      gap={10}
      prefix={{
        children: <Text className={styles.title}>Edit Name</Text>,
      }}
      root={{
        dimensionX: 360,
        children: <String label={"Name"} value={name}></String>,
      }}
      suffix={{
        dimensionX: "fill",
        alignment: "rightCenter",
        children: (
          <Button onClick={onClickAddNew}>
            <Icon name="plus"></Icon>
            <Text className={styles.buttonText}>Add New</Text>
          </Button>
        ),
      }}
    />
  );
};

export default memo(DashboardEditName);
