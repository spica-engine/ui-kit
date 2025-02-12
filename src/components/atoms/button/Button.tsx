import { CSSProperties, FC, memo, ReactNode, useRef } from "react";
import styles from "./Button.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Spinner, { TypeSpinner } from "../spinner/Spinner";

type TypeButton = {
  id?: string;
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
  loading?: boolean;
  spinnerProps?: TypeSpinner;
  keepWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<TypeButton> = ({
  id,
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
  loading,
  spinnerProps,
  keepWidth = true,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const customStyle = {
    minWidth: keepWidth ? buttonRef?.current?.offsetWidth : "unset",
    ...style,
  };

  const getSpinnerColor = () => {
    const isDefaultOrSoftColor = color === "default" || color === "soft";

    if (variant === "solid") {
      return isDefaultOrSoftColor ? "primary" : "default";
    }

    if (["outlined", "dashed", "filled", "text", "link"].includes(variant)) {
      return isDefaultOrSoftColor ? "primary" : color;
    }

    return "primary";
  };

  return (
    <button
      id={id}
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={customStyle}
      className={`${shapes[shape]} ${variants[variant]} ${colors[color]} ${className} ${fullWidth && styles.fullWidth}`}
    >
      {loading ? (
        <Spinner size="small" color={getSpinnerColor()} {...spinnerProps} />
      ) : (
        <FluidContainer root={{ children }} {...containerProps} />
      )}
    </button>
  );
};

export default memo(Button);
