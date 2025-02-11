import React, { FC, memo } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Text from "components/atoms/text/Text";
import styles from "./MenuGroup.module.scss";

type TypeMenuGroup = {
  options?: { prefix?: React.ReactNode; value: string }[][];
} & TypeFlexElement;

const MenuGroup: FC<TypeMenuGroup> = ({ options = [], ...props }) => {
  return (
    <FlexElement
      dimensionX={160}
      direction="vertical"
      gap={0}
      alignment="leftCenter"
      className={styles.container}
      {...props}
    >
      {options.map((section, sectionIndex) => (
        <FlexElement
          key={sectionIndex}
          dimensionX={"fill"}
          direction="vertical"
          gap={0}
          className={styles.menuSection}
        >
          {section.map((option, optionIndex) => (
            <FluidContainer
              gap={10}
              key={optionIndex}
              dimensionX={"fill"}
              prefix={{
                children: option.prefix,
                dimensionX: 14,
                dimensionY: 14,
                className: styles.prefix,
              }}
              root={{ children: <Text className={styles.root}>{option.value}</Text> }}
              className={styles.menuItem}
            />
          ))}
        </FlexElement>
      ))}
    </FlexElement>
  );
};

export default memo(MenuGroup);
