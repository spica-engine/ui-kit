import ArticleIcon from "@mui/icons-material/Article";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import CommitIcon from "@mui/icons-material/Commit";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import BugReportIcon from "@mui/icons-material/BugReport";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import PlaceIcon from "@mui/icons-material/Place";
import PaletteIcon from "@mui/icons-material/Palette";
import CollectionsIcon from "@mui/icons-material/Collections";
import DataObjectIcon from "@mui/icons-material/DataObject";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SecurityIcon from "@mui/icons-material/Security";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import LockIcon from "@mui/icons-material/Lock";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LayersIcon from "@mui/icons-material/Layers";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import EditIcon from "@mui/icons-material/Edit";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaSharpIcon from "@mui/icons-material/ViewAgendaSharp";
import MemoryIcon from "@mui/icons-material/Memory";
import WebhookIcon from "@mui/icons-material/Webhook";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import formatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIconIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

export type IconName =
  | "article"
  | "clockOutline"
  | "login"
  | "google"
  | "facebook"
  | "github"
  | "sourceCommit"
  | "check"
  | "replay"
  | "magnify"
  | "bug"
  | "callMerge"
  | "mapMarker"
  | "palette"
  | "imageMultiple"
  | "dataObject"
  | "formatAlignCenter"
  | "formatAlignLeft"
  | "formatAlignRight"
  | "formatAlignJustify"
  | "formatListChecks"
  | "formatQuoteClose"
  | "numericBox"
  | "calendarBlank"
  | "checkboxBlankOutline"
  | "security"
  | "formatSize"
  | "lock"
  | "filter"
  | "layers"
  | "key"
  | "accountCircle"
  | "fileMultiple"
  | "contentCopy"
  | "swapHorizontal"
  | "fileDocument"
  | "folder"
  | "fullscreen"
  | "pencil"
  | "chevronRight"
  | "codeTags"
  | "chevronDown"
  | "notificationClearAll"
  | "dragHorizontalVariant"
  | "dotsHorizontal"
  | "dotsVertical"
  | "eye"
  | "refresh"
  | "plus"
  | "delete"
  | "minus"
  | "close"
  | "help"
  | "cog"
  | "identities"
  | "assetstore"
  | "dashboard"
  | "bucket"
  | "function"
  | "webhook"
  | "storage"
  | "chevronLeft"
  | "formatBold"
  | "formatItalic"
  | "formatUnderlined"
  | "undo"
  | "redo"
  | "formatColorText"
  | "formatColorFill"
  | "strikethroughS"
  | "webhook"
  | "storage"
  | "chevronLeft"
  | "invertColors";

export type IconSize = "sm" | "md" | "lg";

export const iconMap: { [key in IconName]: React.ComponentType<{ className?: string }> } = {
  article: ArticleIcon,
  clockOutline: QueryBuilderIcon,
  login: LoginIcon,
  google: GoogleIcon,
  facebook: FacebookOutlinedIcon,
  github: GitHubIcon,
  sourceCommit: CommitIcon,
  check: CheckIcon,
  replay: ReplayIcon,
  magnify: SearchIcon,
  bug: BugReportIcon,
  callMerge: CallMergeIcon,
  mapMarker: PlaceIcon,
  palette: PaletteIcon,
  imageMultiple: CollectionsIcon,
  dataObject: DataObjectIcon,
  formatAlignCenter: FormatAlignCenterOutlinedIcon,
  formatAlignLeft: FormatAlignLeftIcon,
  formatAlignRight: formatAlignRightIcon,
  formatAlignJustify: FormatAlignJustifyIconIcon,
  formatListChecks: ChecklistIcon,
  formatQuoteClose: FormatQuoteIcon,
  numericBox: LooksOneIcon,
  calendarBlank: CalendarTodayIcon,
  checkboxBlankOutline: CheckBoxOutlineBlankIcon,
  security: SecurityIcon,
  formatSize: FormatSizeIcon,
  lock: LockIcon,
  filter: FilterAltIcon,
  layers: LayersIcon,
  key: VpnKeyIcon,
  accountCircle: AccountCircleIcon,
  fileMultiple: FileCopyIcon,
  contentCopy: ContentCopyIcon,
  swapHorizontal: SwapHorizOutlinedIcon,
  fileDocument: DescriptionIcon,
  folder: FolderIcon,
  fullscreen: FullscreenIcon,
  pencil: EditIcon,
  chevronRight: ChevronRightIcon,
  codeTags: CodeIcon,
  chevronDown: ExpandMoreIcon,
  notificationClearAll: ClearAllIcon,
  dragHorizontalVariant: DragHandleIcon,
  dotsHorizontal: MoreHorizIcon,
  dotsVertical: MoreVertIcon,
  eye: VisibilityIcon,
  refresh: RefreshIcon,
  plus: AddIcon,
  delete: DeleteIcon,
  minus: RemoveIcon,
  close: CloseIcon,
  help: QuestionMarkOutlinedIcon,
  cog: SettingsIcon,
  identities: PeopleIcon,
  assetstore: LocalGroceryStoreIcon,
  dashboard: DashboardIcon,
  bucket: ViewAgendaSharpIcon,
  function: MemoryIcon,
  webhook: WebhookIcon,
  storage: CloudUploadIcon,
  chevronLeft: ChevronLeftIcon,
  formatBold: FormatBoldIcon,
  formatItalic: FormatItalicIcon,
  formatUnderlined: FormatUnderlinedIcon,
  undo: UndoIcon,
  redo: RedoIcon,
  formatColorFill: FormatColorFillIcon,
  formatColorText: FormatColorTextIcon,
  strikethroughS: StrikethroughSIcon,
  invertColors: InvertColorsIcon,
};
