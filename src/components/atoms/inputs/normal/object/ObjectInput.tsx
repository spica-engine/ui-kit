import { FC, memo } from "react";
import styles from "./ObjectInput.module.scss";
import Icon from "@atoms/icon/Icon";
import InputHeader from "@atoms/input-header/InputHeader";
import Text, { TypeText } from "@atoms/text/Text";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import InputGroup from "@atoms/base-input/InputGroup";
import useInputRepresenter, {
  TypeInputRepresenterError,
  TypeProperties,
  TypeRepresenterValue,
} from "@custom-hooks/useInputRepresenter";

export type TypeObjectInput = {
  value?: TypeRepresenterValue;
  properties: TypeProperties;
  title?: string;
  description?: string;
  errorMessage?: string;
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeText;
  onChange?: (value: any) => void;
  errors?: TypeInputRepresenterError;
} & TypeFlexElement;

const ObjectInput: FC<TypeObjectInput> = ({
  value,
  properties,
  title,
  description,
  errorMessage,
  helperTextContainerProps,
  helperTextProps,
  onChange,
  errors,
  ...props
}) => {
  const inputFields = useInputRepresenter({
    properties,
    value,
    onChange: onChange,
    error: errors,
    errorClassName: styles.error,
    containerClassName: styles.inputContainer,
  });

  return (
    <FlexElement
      gap={20}
      direction="vertical"
      dimensionX="fill"
      {...props}
      className={`${props.className} ${styles.container}`}
    >
      {title && (
        <InputHeader
          prefix={{ children: <Icon name="dataObject" className={styles.icon} /> }}
          root={{ children: <Text variant="secondary">{title}</Text> }}
        />
      )}
      {inputFields}
      {(errorMessage || description) && (
        <InputGroup.HelperText
          alignment="leftCenter"
          dimensionX="fill"
          {...helperTextContainerProps}
          className={`${styles.helperText} ${helperTextContainerProps?.className}`}
        >
          <Text
            {...helperTextProps}
            size="small"
            variant={errorMessage ? "danger" : "secondary"}
            className={`${helperTextProps?.className}`}
          >
            {errorMessage || description}
          </Text>
        </InputGroup.HelperText>
      )}
    </FlexElement>
  );
};

export default memo(ObjectInput);
