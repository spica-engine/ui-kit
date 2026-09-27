import { FC, JSX, memo, useCallback } from "react";
import styles from "./RichText.module.scss";
import { ExtendedTextNode } from "./plugins/ExtendedTextNode";
import { $createParagraphNode, $getRoot, EditorState, LexicalEditor, TextNode } from "lexical";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import LexicalContent from "./LexicalContent";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import Icon from "@atoms/icon/Icon";
import { IconName } from "@utils/iconList";

export type TypeRichTextInput = {
  headerProps?: {
    icon?: IconName;
    label?: string;
  };
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  description?: string;
  contentProps?: TypeFlexElement;
  placeHolder?: string | JSX.Element;
};

const RichTextInput: FC<TypeRichTextInput> = ({
  className = "",
  value = "<p></p>",
  headerProps,
  description,
  onChange,
  contentProps,
  placeHolder,
}) => {
  const updateHTML = (editor: LexicalEditor, value: string) => {
    const root = $getRoot();
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    root.clear();

    try {
      root.append(...nodes);
    } catch {
      const p = $createParagraphNode();
      p.append(...nodes);
      root.append(p);
    }
  };

  const prepopulatedRichText = (editor: LexicalEditor, html: string) => {
    updateHTML(editor, html);
    return editor;
  };

  const initialConfig = {
    namespace: "RichTextInput",
    onError: (error: Error) => {
      console.error("Lexical Error:", error);
    },
    editorState: (editor: any) => prepopulatedRichText(editor, value as string),
    nodes: [
      ExtendedTextNode,
      {
        replace: TextNode,
        with: (node: TextNode) => new ExtendedTextNode(node.__text),
      },
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
    ],
  };

  const handleChange = useCallback(
    (state: EditorState, editor: LexicalEditor) => {
      state.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onChange?.(htmlString);
      });
    },
    [onChange]
  );

  return (
    <FlexElement
      direction="vertical"
      alignment="leftTop"
      dimensionX="fill"
      className={`${styles.field} ${className}`}
    >
      {headerProps?.label && (
        <div className={styles.fieldHead}>
          <div className={styles.fieldName}>
            {headerProps.icon && <Icon className={styles.icon} name={headerProps.icon} />}
            <span>{headerProps.label}</span>
          </div>
          <span className={styles.fieldType}>richtext</span>
        </div>
      )}

      <LexicalComposer initialConfig={initialConfig}>
        <LexicalContent {...contentProps} onChange={handleChange} placeHolder={placeHolder} />
      </LexicalComposer>
      {description && (
        <Text size="xsmall" className={styles.description}>
          {description}
        </Text>
      )}
    </FlexElement>
  );
};

export default memo(RichTextInput);
