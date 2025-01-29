import React, { memo } from "react";
import Text from "../text/Text";
import styles from "./Json.module.scss";

type TypeJson = {
  data: Record<string, unknown>;
};

const Json: React.FC<TypeJson> = ({ data }) => {
  return <Text className={styles.jsonContainer}>{JSON.stringify(data, null, 2)}</Text>;
};

export default memo(Json);
