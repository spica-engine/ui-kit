import ColorPicker from "./ColorPicker";
import DropDown, {  } from "./Dropdown";

type Props = {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: any;
  title?: string;
  stopCloseOnClickSelf?: boolean;
  color: string;
  onChange?: (color: string, skipHistoryStack: boolean) => void;
};

export default function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  ...rest
}: Props) {
  return (
    <DropDown
      {...rest}
      colorPicker={true}
      disabled={disabled}
      stopCloseOnClickSelf={stopCloseOnClickSelf}
    >
      <div style={{ position: "static", top: 0, zIndex: 99 }}>
        <ColorPicker color={color} onChange={onChange} />
      </div>
    </DropDown>
  );
}
