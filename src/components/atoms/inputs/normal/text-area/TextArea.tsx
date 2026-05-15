import { ChangeEventHandler, FC, memo, useRef } from "react";
import FlexElement, { TypeFlexElement } from "../../../flex-element/FlexElement";
import styles from "./TextArea.module.scss";
import Icon from "@atoms/icon/Icon";
import { IconName } from "@utils/iconList";
import Text from "@atoms/text/Text";

export type TypeTextArea = {
  value?: string;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    rows?: number;
    cols?: number;
  };
  containerProps?: TypeFlexElement;
  title?: string;
  icon?: IconName;
  description?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

const TextAreaInput: FC<TypeTextArea> = ({
  value,
  title,
  icon,
  textAreaProps,
  containerProps,
  description,
  placeholder,
  onChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <FlexElement
      direction="vertical"
      alignment="leftTop"
      dimensionX="fill"
      {...containerProps}
      className={`${styles.field} ${containerProps?.className ?? ""}`}
    >
      {title && (
        <div className={styles.fieldHead}>
          <div className={styles.fieldName}>
            {icon && <Icon className={styles.icon} name={icon} />}
            <span>{title}</span>
          </div>
          <span className={styles.fieldType}>textarea</span>
        </div>
      )}
      <textarea
        className={styles.textAreaInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? (title ? `Enter ${title}` : "")}
        ref={textAreaRef}
        {...textAreaProps}
      />
      {description && (
        <Text size="xsmall" variant="secondary" className={styles.description}>
          {description}
        </Text>
      )}
    </FlexElement>
  );
};

export default memo(TextAreaInput);
