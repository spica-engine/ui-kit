import { CSSProperties, FC, memo, ReactNode } from "react";
import styles from "./Button.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";

type TypeButton = {
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  containerProps?: TypeFluidContainer;
  className?: string;
  style?: CSSProperties;
  shape?: "default" | "circle" | "round";
  type?: "submit" | "reset" | "button";
  variant?: "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
  color?: "primary" | "default" | "success" | "danger" | "soft" | "transparent";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<TypeButton> = ({
  fullWidth,
  type = "button",
  disabled,
  containerProps,
  children,
  className = "",
  style,
  shape = "default",
  variant = "solid",
  color = "primary",
  onClick,
}) => {
  const colors = {
    primary: styles.cPrimary,
    default: styles.cDefault,
    success: styles.cSuccess,
    danger: styles.cDanger,
    soft: styles.cSoft,
    transparent: styles.cTransparent,
  };

  const variants = {
    solid: styles.vSolid,
    outlined: styles.vOutlined,
    dashed: styles.vDashed,
    filled: styles.vFilled,
    text: styles.vText,
    link: styles.vLink,
  };

  const shapes = {
    default: styles.sDefault,
    circle: styles.sCircle,
    round: styles.sRound,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={style}
      className={`${shapes[shape]} ${variants[variant]} ${colors[color]} ${className} ${fullWidth && styles.fullWidth}`}
    >
      <FluidContainer {...containerProps} root={{ children }} />
    </button>
  );
};

export default memo(Button);
