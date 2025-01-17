import "./FontSize.css";

import { $patchStyleText } from "@lexical/selection";
import { $getSelection, LexicalEditor } from "lexical";
import * as React from "react";

import DropDown, { DropDownItem } from "./Dropdown";

const DEFAULT_FONT_SIZE = 15;

// eslint-disable-next-line no-shadow
enum updateFontSizeType {
  increment = 1,
  decrement,
}

export default function FontSize({
  selectionFontSize,
  editor,
}: {
  selectionFontSize: string;
  editor: LexicalEditor;
}) {
  const [inputValue, setInputValue] = React.useState<string>(selectionFontSize);

  const updateFontSizeInSelection = React.useCallback(
    (newFontSize: string | null, updateType: updateFontSizeType | null) => {
      const getNextFontSize = (prevFontSize: string | null): string => {
        if (!prevFontSize) {
          prevFontSize = `${DEFAULT_FONT_SIZE}px`;
        }
        prevFontSize = prevFontSize.slice(0, -2);
        return `${prevFontSize}px`;
      };

      editor.update(() => {
        if (editor.isEditable()) {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, {
              "font-size": newFontSize || getNextFontSize,
            });
          }
        }
      });
    },
    [editor]
  );

  React.useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);

  const handleClickOption = (value: number) => {
    updateFontSizeInSelection(String(value) + "px", null);
  };

  return (
    <DropDown buttonOnClick={() => {}} buttonLabel={`${inputValue}px`}>
      {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72].map((el) => (
        <DropDownItem key={el} onClick={() => handleClickOption(el)}>
          <span className="text">{el}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}
