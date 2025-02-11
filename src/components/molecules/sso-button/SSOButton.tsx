import Button from "components/atoms/button/Button";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { IconName } from "utils/iconList";
import styles from "./SSOButton.module.scss";
import Text from "components/atoms/text/Text";

type TypeSSOButton = {
  icon: IconName;
  label: string;
  onClick?: () => void;
};

const SSOButton: FC<TypeSSOButton> = ({ icon, label, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [rootWidth, setRootWidth] = useState(112);
  const ICON_WIDTH = 14;

  useEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.offsetWidth);
    }
  }, [label]);

  return (
    <FluidContainer
      ref={containerRef}
      dimensionX={200}
      alignment="leftCenter"
      mode="fill"
      gap={10}
      prefix={{
        children: <Icon name={icon} size="sm" className={isClicked ? styles.active : ""} />,
      }}
      root={{
        children: (
          <Text ref={rootRef} className={`${styles.text} ${isClicked ? styles.active : ""}`}>
            {label}
          </Text>
        ),
        dimensionX: rootWidth + (isClicked ? -ICON_WIDTH : ICON_WIDTH),
        alignment: "leftCenter",
      }}
      suffix={{
        children: isClicked ? <Icon name="check" size="sm" className={styles.active} /> : undefined,
      }}
      onClick={handleClick}
      className={`${styles.ssoButton} ${isClicked ? styles.clicked : ""}`}
    />
  );
};

export default memo(SSOButton);
