import { FC, JSX, memo, useEffect, useRef, useState } from "react";
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
  placeHolder?: string | JSX.Element;
} & TypeFlexElement;

const LexicalContent: FC<TypeLexicalContent> = memo(({ onChange, placeHolder, ...props }) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [placeHolderTop, setPlaceHolderTop] = useState(0);

  useEffect(() => {
    if (!toolbarRef.current) return;
    setPlaceHolderTop(toolbarRef.current.clientHeight);
  }, [toolbarRef.current?.clientHeight, toolbarRef.current?.offsetHeight]);

  return (
    <FlexElement
      direction="vertical"
      dimensionX={"fill"}
      dimensionY={472}
      alignment="leftTop"
      {...props}
    >
      <div className={styles.editorContainer}>
        <ToolbarPlugin editor={editor} toolbarRef={toolbarRef} />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editableContent} />}
          placeholder={
            placeHolder && (
              <div className={styles.placeholder} style={{ top: placeHolderTop }}>
                {placeHolder}
              </div>
            )
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MyOnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </FlexElement>
  );
});

export default LexicalContent;
