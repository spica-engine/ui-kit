import React, { FC, memo, useState } from "react";
import styles from "./StringMinimized.module.scss";
import IconButton from "components/atoms/icon-button/IconButton";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Input from "components/atoms/input/Input";
import Select from "components/molecules/select/Select";
import Button from "components/atoms/button/Button";
import Icon from "components/atoms/icon/Icon";

type TypeStringMinimized = {
  onClear?: () => void;
  value?: string;
  options?: { label: string; value: string }[];
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const StringMinimized: FC<TypeStringMinimized> = ({ onClear, value, options, ...props }) => {
  return (
    <FluidContainer
      className={styles.stringMinimized}
      root={{
        children: options ? (
          <Select
            className={styles.select}
            placeholder={value || " "}
            options={options || []}
            onChange={(value) => console.log(value)}
          />
        ) : (
          <Input value={value} {...props} />
        ),
        dimensionX: "fill",
        alignment: "leftCenter",
      }}
      suffix={{
        children: (
          <Button
            children={<Icon name="close" />}
            color="transparent"
            onClick={onClear}
            className={styles.closeIcon}
          />
        ),
        dimensionX: "hug",
        alignment: "center",
      }}
      alignment="leftCenter"
      dimensionX="fill"
    />
  );
};

export default memo(StringMinimized);
