import { FC, memo } from "react";
import styles from "./LexicalContent.module.scss";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MyOnChangePlugin from "./plugins/OnChangePlugin";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { EditorState, LexicalEditor } from "lexical";

export type TypeLexicalContent = {
  onChange: (state: EditorState, editor: LexicalEditor) => void;
} & TypeFlexElement;

const LexicalContent: FC<TypeLexicalContent> = memo(({ onChange, ...props }) => {
  const [editor] = useLexicalComposerContext();
  return (
    <FlexElement
      direction="vertical"
      dimensionX={"fill"}
      dimensionY={472}
      alignment="leftTop"
      {...props}
    >
      <>
        <ToolbarPlugin editor={editor} />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editableContent} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MyOnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </>
    </FlexElement>
  );
});

export default LexicalContent;
