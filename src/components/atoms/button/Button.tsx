import { ButtonHTMLAttributes, FC, memo, useRef } from "react";
import styles from "./Button.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Spinner, { TypeSpinner } from "../spinner/Spinner";
import { TypeFlexDimension } from "@utils/interface";

type TypeButton = {
  fullWidth?: boolean;
  containerProps?: TypeFluidContainer;
  shape?: "default" | "circle" | "round";
  variant?: "solid" | "outlined" | "dashed" | "filled" | "text" | "link" | "icon";
  color?: "primary" | "default" | "success" | "danger" | "soft" | "transparent";
  loading?: boolean;
  spinnerProps?: TypeSpinner;
  keepWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  TypeFlexDimension;

const Button: FC<TypeButton> = ({
  fullWidth,
  containerProps,
  children,
  shape = "default",
  variant = "solid",
  color = "primary",
  loading,
  spinnerProps,
  keepWidth = true,
  ...props
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
    icon: styles.vIcon,
  };

  const shapes = {
    default: styles.sDefault,
    circle: styles.sCircle,
    round: styles.sRound,
  };

  const customStyle = {
    minWidth: keepWidth ? buttonRef?.current?.offsetWidth : "unset",
    ...props.style,
  };

  const getSpinnerColor = () => {
    const isDefaultOrSoftColor = color === "default" || color === "soft";

    if (variant === "solid") {
      return isDefaultOrSoftColor ? "primary" : "default";
    }

    if (["outlined", "dashed", "filled", "text", "link", "icon"].includes(variant)) {
      return isDefaultOrSoftColor ? "primary" : color;
    }

    return "primary";
  };

  return (
    <button
      ref={buttonRef}
      {...props}
      style={customStyle}
      className={`${shapes[shape]} ${variants[variant]} ${colors[color]} ${props.className} ${fullWidth && styles.fullWidth}`}
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
