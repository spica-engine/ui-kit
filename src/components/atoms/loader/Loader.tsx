import styles from "./Loader.module.scss";

type LoaderProps = {
  className?: string;
  size?: "small" | "medium" | "large";
};

const SIZE_CLASSES = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const Loader = ({ className, size = "medium" }: LoaderProps) => {
  return <div className={`${styles.loader} ${SIZE_CLASSES[size]} ${className || ""} `} />;
};

export default Loader;
