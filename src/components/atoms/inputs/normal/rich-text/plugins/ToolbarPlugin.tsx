import "./ToolbarPlugin.scss";
import React, { FC, JSX, memo } from "react";
import { mergeRegister, $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isElementNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  LexicalEditor,
  ElementFormatType,
  FOCUS_COMMAND,
  LexicalCommand,
  TextFormatType,
} from "lexical";
import {
  $patchStyleText,
  $setBlocksType,
  $getSelectionStyleValueForProperty,
} from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
  $isHeadingNode,
} from "@lexical/rich-text";

import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";

import { $isLinkNode } from "@lexical/link";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownColorPicker from "../ui/DropdownColorPicker";
import DropDown, { DropDownItem } from "../ui/Dropdown";
import { NodeKey } from "lexical";
import { getSelectedNode } from "../utils/getSelectedNode";
import FontSize from "../ui/FontSize";
import Icon from "components/atoms/icon/Icon";

const LowPriority = 1;

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
  ["Roboto", "Roboto"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];

function dropDownActiveClass(active: boolean) {
  if (active) {
    return "active dropdown-item-active";
  } else {
    return "";
  }
}

function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={"icon block-type " + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "paragraph")}
        onClick={formatParagraph}
      >
        <span className="text">Normal</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h1")}
        onClick={() => formatHeading("h1")}
      >
        <span className="text">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h2")}
        onClick={() => formatHeading("h2")}
      >
        <span className="text">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "h3")}
        onClick={() => formatHeading("h3")}
      >
        <span className="text">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "bullet")}
        onClick={formatBulletList}
      >
        <span className="text">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "number")}
        onClick={formatNumberedList}
      >
        <span className="text">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={"item " + dropDownActiveClass(blockType === "quote")}
        onClick={formatQuote}
      >
        <span className="text">Quote</span>
      </DropDownItem>
    </DropDown>
  );
}

function FontDropDown({
  editor,
  value,
  style,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === "font-family"
      ? "Formatting options for font family"
      : "Formatting options for font size";

  return (
    <DropDown
      buttonOnClick={() => {
        // @ts-ignore
        editor.dispatchCommand(FOCUS_COMMAND, undefined);
      }}
      buttonClassName={"toolbar-item " + style}
      buttonLabel={value}
      buttonIconClassName={style === "font-family" ? "icon block-type font-family" : ""}
      buttonAriaLabel={buttonAriaLabel}
    >
      {(style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(([option, text]) => (
        <DropDownItem
          className={`item ${dropDownActiveClass(value === option)} ${
            style === "font-size" ? "fontsize-item" : ""
          }`}
          onClick={() => handleClick(option)}
          key={option}
        >
          <span className="text">{option}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}

function Divider() {
  return <div className="divider" />;
}

type TypeToolbarPlugin = {
  editor: LexicalEditor;
};

const ToolbarPlugin: FC<TypeToolbarPlugin> = memo(({ editor }) => {
  const toolbarRef = useRef(null);
  const sizeSvgRef = useRef(null);
  const bucketSvgRef = useRef(null);
  const [fontSize, setFontSize] = useState<string>("14px");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      // Update text format
      setIsCode(selection.hasFormat("code"));
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
      // Handle buttons
      setFontColor($getSelectionStyleValueForProperty(selection, "color", "#000"));
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#fff"));
      setFontFamily($getSelectionStyleValueForProperty(selection, "font-family", "Arial"));
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || "left"
      );
    }
    if ($isRangeSelection(selection)) {
      setFontSize($getSelectionStyleValueForProperty(selection, "font-size", "14px"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      editor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: "historic" } : {}
      );
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      setSizeSvgColor(value);
      applyStyleText({ color: value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      setBucketSvgColor(value);
      applyStyleText({ "background-color": value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  useEffect(() => {
    setSizeSvgColor("white");
  }, [sizeSvgRef]);

  useEffect(() => {
    setBucketSvgColor("white");
  }, [bucketSvgRef]);

  const setSizeSvgColor = (color: string) => {
    if (!color || !sizeSvgRef.current) return;
    // @ts-ignore
    const paths = sizeSvgRef.current.querySelectorAll("path");
    if (paths[5]) {
      paths[5].setAttribute("fill", color);
    }
  };

  const setBucketSvgColor = (color: string) => {
    if (!color || !bucketSvgRef.current) return;
    // @ts-ignore
    const paths = bucketSvgRef.current.querySelectorAll("path");
    if (paths[0]) {
      paths[0].setAttribute("fill", color);
    }
  };

  const handleClick = useCallback(
    (command: LexicalCommand<FocusEvent | TextFormatType>, payload: any) => {
      editor.dispatchCommand(command, payload);
    },
    []
  );

  return (
    <div
      className={`toolbar`}
      ref={toolbarRef}
      onClick={() => {
        // @ts-ignore
        editor.dispatchCommand(FOCUS_COMMAND, undefined);
      }}
    >
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <Icon name="undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <Icon name="redo" />
      </button>
      <Divider />
      <BlockFormatDropDown blockType={blockType} editor={editor} />
      <Divider />
      <FontDropDown style={"font-family"} value={fontFamily} editor={editor} />
      <Divider />
      <FontSize selectionFontSize={fontSize.slice(0, -2)} editor={editor} />
      <Divider />
      <button
        onClick={() => {
          handleClick(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <Icon name="formatBold" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <Icon name="formatItalic" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <Icon name="formatUnderlined" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_TEXT_COMMAND, "code");
        }}
        className={"toolbar-item spaced " + (isCode ? "active" : "")}
        aria-label="Format Underline"
      >
        <Icon name="codeTags" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <Icon name="strikethroughS" />
      </button>
      <Divider />
      <button
        onClick={() => {
          handleClick(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className={"toolbar-item spaced " + (elementFormat == "left" ? "active" : "")}
        aria-label="Left Align"
      >
        <Icon name="formatAlignLeft" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className={"toolbar-item spaced " + (elementFormat == "center" ? "active" : "")}
        aria-label="Center Align"
      >
        <Icon name="formatAlignCenter" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className={"toolbar-item spaced " + (elementFormat == "right" ? "active" : "")}
        aria-label="Right Align"
      >
        <Icon name="formatAlignRight" />
      </button>
      <button
        onClick={() => {
          handleClick(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className={"toolbar-item spaced " + (elementFormat == "justify" ? "active" : "")}
        aria-label="Justify Align"
      >
        <Icon name="formatAlignJustify" />
      </button>

      <Divider />
      <DropdownColorPicker
        buttonClassName="toolbar-item"
        buttonAriaLabel="Formatting text color"
        buttonLabel={<Icon name="formatColorText" />}
        color={fontColor}
        onChange={onFontColorSelect}
        title="text color"
      />
      <DropdownColorPicker
        buttonClassName="toolbar-item"
        buttonAriaLabel="Formatting background color"
        buttonLabel={<Icon name="formatColorFill" />}
        color={bgColor}
        onChange={onBgColorSelect}
        title="bg color"
      />
    </div>
  );
});

export default ToolbarPlugin;
