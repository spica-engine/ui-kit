import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import React, { FC, memo } from "react";
import styles from "./NavigatorItem.module.scss";
import { IconName } from "utils/iconList";
import Text from "components/atoms/text/Text";
import Button from "components/atoms/button/Button";

type SuffixIcon = {
  IconName: IconName;
  onClick?: () => void;
};

type TypeNavigatorItem = {
  label: string;
  prefixIcon?: IconName;
  suffixIcons?: SuffixIcon[];
} & TypeFluidContainer;

const NavigatorItem: FC<TypeNavigatorItem> = ({
  label,
  prefixIcon,
  suffixIcons = [],
  ...props
}) => {
  return (
    <FluidContainer
      dimensionX={"fill"}
      dimensionY={36}
      mode="fill"
      prefix={
        prefixIcon
          ? {
              children: <Icon name={prefixIcon} />,
            }
          : undefined
      }
      root={{
        children: (
          <Text alignment="leftCenter" dimensionX={"fill"}>
            {label}
          </Text>
        ),
      }}
      suffix={
        suffixIcons.length
          ? {
              children: (
                <>
                  {suffixIcons.map(({ IconName, onClick }, index) => (
                    <Button
                      key={index}
                      color="transparent"
                      className={styles.suffixButton}
                      onClick={onClick}
                    >
                      <Icon name={IconName} />
                    </Button>
                  ))}
                </>
              ),
            }
          : undefined
      }
      {...props}
      className={`${styles.navigatorItem} ${props.className}`}
    />
  );
};

export default memo(NavigatorItem);
