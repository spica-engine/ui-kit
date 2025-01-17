import { FC, memo } from "react";
import FlexElement, { FlexElementProps } from "../../../flex-element/FlexElement";
import styles from "./TextArea.module.scss";
import FluidContainer, { FluidContainerProps } from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import { IconName } from "utils/iconList";

type TypeTextArea = {
    textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        rows?: number;
        cols?: number;
    };
    textAreaContainerProps?: FlexElementProps;
    containerProps?: FlexElementProps;
    titlePrefixProps?: FlexElementProps;
    titleRootProps?: FlexElementProps;
    titleContainerProps?: FluidContainerProps;
    title?: string;
    icon?: IconName;
};

const TextAreaInput: FC<TypeTextArea> = memo(({
    title = '',
    icon = 'formatSize',
    textAreaProps,
    textAreaContainerProps,
    titleContainerProps,
    titlePrefixProps,
    titleRootProps,
    containerProps,
    }) => {

    const mergedTextAreaContainerProps = { dimensionX: 'fill',alignment: 'leftCenter',
        ...textAreaContainerProps } as const;
    const mergedTitleContainerProps = { dimensionX: 'fill', dimensionY: 36, alignment: 'leftCenter', 
        ...titleContainerProps } as const;
    const mergedTitlePrefixProps = { dimensionX: 'hug', alignment: 'leftCenter', 
        ...titlePrefixProps } as const;
    const mergedTitleRootProps = { dimensionX: 'fill', alignment: 'leftCenter', 
        ...titleRootProps } as const;
    const mergedContainerProps = { dimensionX: 'fill', alignment: 'leftCenter', direction: 'vertical', 
        ...containerProps } as const;

    return (
        <FlexElement
            className={styles.textAreaInputContainer}
            {...mergedContainerProps}
        >
            <>
                <FluidContainer
                    {...mergedTitleContainerProps}
                    prefix={{
                        children: <Icon name={`${icon}`} />,
                        ...mergedTitlePrefixProps
                    }}
                    root={{
                        children: title,
                        ...mergedTitleRootProps
                    }}
                    className={styles.textAreaTitle}
                />
                <FlexElement
                    children={
                        <textarea
                            {...textAreaProps}
                            placeholder={textAreaProps?.placeholder}
                            className={styles.textArea}
                        />
                    }
                    className={styles.textAreaInput}
                    {...mergedTextAreaContainerProps}
                />
            </>
        </FlexElement>
    )
});

export default TextAreaInput