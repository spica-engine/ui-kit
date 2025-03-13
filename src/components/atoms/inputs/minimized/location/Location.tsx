import React, { ReactNode } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./Location.module.scss";
import Popover from "@atoms/popover/Popover";
import FluidContainer from "@atoms/fluid-container/FluidContainer";
import locationIcon from "../../../../../assets/images/location.png";
import Text from "@atoms/text/Text";
import Map, { TypeMapProps } from "@atoms/map/Map";

type TypeMinimizedLocationInput = TypeFlexElement & {
  contentProps?: TypeFlexElement;
  mapProps?: TypeMapProps;
  icon?: ReactNode;
};

const MinimizedLocationInput = ({
  contentProps,
  mapProps,
  icon,
  ...props
}: TypeMinimizedLocationInput) => {
  return (
    <Popover
      content={<Map {...mapProps} />}
      contentProps={contentProps}
      containerProps={{ dimensionX: "fill", alignment: "leftCenter", ...props }}
    >
      <FluidContainer
        dimensionX="fill"
        dimensionY="fill"
        prefix={{ children: icon || <img src={locationIcon} alt="location" /> }}
        root={{
          children: mapProps?.coordinates && (
            <Text>
              {mapProps?.coordinates?.lat}, {mapProps?.coordinates?.lng}{" "}
            </Text>
          ),
        }}
        className={styles.container}
      />
    </Popover>
  );
};

export default MinimizedLocationInput;
