import React, { ReactNode, useEffect, useState } from "react";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./Location.module.scss";
import Popover from "@atoms/popover/Popover";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import locationIcon from "../../../../../assets/images/location.png";
import Map, { TypeMapProps } from "@atoms/map/Map";
import { Input } from "index.export";

type ChildrenProps = Omit<TypeFluidContainer, "prefix" | "root" | "suffix"> & {
  prefix?: TypeFlexElement;
  root?: Omit<TypeFlexElement, "children">;
  suffix?: TypeFlexElement;
};

export type TypeMinimizedLocationInput = {
  contentProps?: TypeFlexElement;
  childrenProps?: ChildrenProps;
  containerProps?: TypeFlexElement;
  mapProps?: TypeMapProps;
  icon?: ReactNode;
};

const MinimizedLocationInput = ({
  contentProps,
  mapProps,
  icon,
  childrenProps,
  containerProps,
  ...props
}: TypeMinimizedLocationInput) => {
  const [value, setValue] = useState<string>(
    mapProps?.coordinates?.lat + " , " + mapProps?.coordinates?.lng
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const coordinatePattern = /^-?\d*\.?\d*\s*,\s*-?\d*\.?\d*$/;
    if (inputValue === "" || coordinatePattern.test(inputValue)) {
      setValue(inputValue);
    }
  };

  useEffect(() => {
    const coordinates = value.split(",");
    if (coordinates.length === 2) {
      const lat = Number.parseFloat(coordinates[0].trim());
      const lng = Number.parseFloat(coordinates[1].trim());

      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        mapProps?.onChange?.({
          lat,
          lng,
        });
      }
    }
  }, [value]);

  return (
    <Popover
      content={
        <Map key={`${mapProps?.coordinates?.lat}-${mapProps?.coordinates?.lng}`} {...mapProps} />
      }
      contentProps={{ dimensionX: 500, dimensionY: 500, ...contentProps }}
      containerProps={{ dimensionX: "fill", alignment: "leftCenter", ...props }}
    >
      <FluidContainer
        dimensionX="fill"
        dimensionY="fill"
        {...childrenProps}
        prefix={{
          children: childrenProps?.prefix?.children || icon || (
            <img src={locationIcon} alt="location" className={styles.icon} />
          ),
          className: styles.iconContainer,
        }}
        root={{
          children: mapProps?.coordinates && (
            <Input
              value={value}
              onChange={handleChange}
              dimensionY={"fill"}
              className={styles.input}
            />
          ),
          dimensionX: "fill",
          dimensionY: "fill",
          className: childrenProps?.root?.className,
        }}
        className={`${styles.container} ${childrenProps?.className}`}
      />
    </Popover>
  );
};

export default MinimizedLocationInput;
