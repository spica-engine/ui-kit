import { Button, FluidContainer, Icon, Text } from "index.export";
import React, { FC, memo } from "react";
import styles from "./BucketRulePopup.module.scss";
import TextArea from "@atoms/inputs/normal/text-area/TextArea";
import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";

type TypeDashboardEditNameProps = {
  name?: string;
  onClickApply?: () => void;
  onClickCancel?: () => void;
  onClickHelp?: () => void;
} & TypeFluidContainer;

const BucketRulePopup: FC<TypeDashboardEditNameProps> = ({
  name,
  onClickApply,
  onClickCancel,
  onClickHelp,
  ...props
}) => {
  return (
    <FluidContainer
      direction="vertical"
      gap={10}
      prefix={{
        className: styles.prefix,
        dimensionX: "fill",
        alignment: "leftCenter",
        children: (
          <>
            <Text className={styles.rules}>RULES</Text>
            <Button className={styles.helpButton} variant="icon" onClick={onClickHelp}>
              <Icon name="help"></Icon>
            </Button>
          </>
        ),
      }}
      root={{
        className: styles.textAreaContainer,
        children: <TextArea value={name}></TextArea>,
      }}
      suffix={{
        className: styles.suffix,
        dimensionX: "fill",
        alignment: "rightCenter",
        children: (
          <>
            <Button color="transparent" variant="icon" onClick={onClickCancel}>
              <Icon className={styles.iconCancel} name="close"></Icon>
              <Text>Cancel</Text>
            </Button>
            <Button onClick={onClickApply}>
              <Icon name="filter"></Icon>
              <Text className={styles.buttonTextApply}>Apply</Text>
            </Button>
          </>
        ),
      }}
      {...props}
      className={`${styles.container} ${props.className}`}
    />
  );
};
export default memo(BucketRulePopup);
