import { FC, memo, useCallback } from "react";
import styles from "./RichText.module.scss";
import { ExtendedTextNode } from "./plugins/ExtendedTextNode";
import { $createParagraphNode, $getRoot, EditorState, LexicalEditor, TextNode } from "lexical";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import LexicalContent from "./LexicalContent";
import FlexElement from "components/atoms/flex-element/FlexElement";

export type TypeRichTextInput = {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
};

const RichTextInput: FC<TypeRichTextInput> = memo(({ className = "", value, onChange }) => {
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

  const handleChange = useCallback((state: EditorState, editor: LexicalEditor) => {
    state.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange?.(htmlString);
    });
  }, []);

  return (
    <FlexElement className={`${styles.container} ${className}`} dimensionX={"fill"}>
      <LexicalComposer initialConfig={initialConfig}>
        <LexicalContent onChange={handleChange} />
      </LexicalComposer>
    </FlexElement>
  );
});

export default RichTextInput;
