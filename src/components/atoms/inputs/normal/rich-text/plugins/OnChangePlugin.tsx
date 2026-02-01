import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical/LexicalEditor";
import { EditorState } from "lexical/LexicalEditorState";
import React from "react";

function MyOnChangePlugin({
  onChange,
}: {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
}): any {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState, editor);
    });
  }, [editor, onChange]);

  return null;
}

export default MyOnChangePlugin;
