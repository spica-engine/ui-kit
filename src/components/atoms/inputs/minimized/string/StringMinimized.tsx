import React, { FC, memo, useState } from "react";
import InputWithIcon from "components/atoms/input-with-icon/InputWithIcon";
import styles from "./StringMinimized.module.scss";
import IconButton from "components/atoms/icon-button/IconButton";

type TypeStringMinimized = {
  onClear?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const StringMinimized: FC<TypeStringMinimized> = ({ onClear, ...props }) => {
  return (
    <InputWithIcon
      className={styles.stringMinimized}
      inputProps={{
        ...props,
      }}
      suffix={{
        children: (
          <IconButton
            icon="close"
            variant="base"
            buttonProps={{
              onClick: onClear,
            }}
          />
        ),
        dimensionX: "hug",
        alignment: "center",
      }}
      alignment="leftCenter"
      dimensionX="fill"
      dimensionY={36}
    />
  );
};

export default memo(StringMinimized);
