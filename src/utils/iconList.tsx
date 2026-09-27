import { CSSProperties } from "react";
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
import FolderZipIcon from "@mui/icons-material/FolderZip";
import MovieIcon from "@mui/icons-material/Movie";
import GridOnIcon from "@mui/icons-material/GridOn";
import BallotIcon from "@mui/icons-material/Ballot";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SortIcon from "@mui/icons-material/Sort";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NotesIcon from "@mui/icons-material/Notes";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  SvgSearch,
  SvgDashboard,
  SvgHome,
  SvgChevronLeft,
  SvgChevronDown,
  SvgChevronRight,
  SvgThreeDotsV,
  SvgClose,
  SvgList,
  SvgBucket,
  SvgStorage,
  SvgCopy,
  SvgSave,
  SvgAdd,
  SvgCheck,
  SvgTrash,
  SvgTrashSimple,
  SvgEdit,
  SvgRename,
  SvgDownload,
  SvgSettings,
  SvgExtensions,
  SvgFields,
  SvgFilter,
  SvgUser,
  SvgUsers,
  SvgLock,
  SvgLogin,
  SvgEye,
  SvgEyeOff,
  SvgMoon,
  SvgSun,
  SvgPlay,
  SvgDocument,
  SvgCalendar,
  SvgNumberField,
  SvgFunctions,
  SvgGit,
  SvgGithub,
  SvgArrowUp,
  SvgArrowDown,
  SvgExternal,
  SvgGrip,
  SvgFieldText,
  SvgFieldNumber,
  SvgFieldBoolean,
  SvgFieldDate,
  SvgFieldRelation,
  SvgFieldLocation,
  SvgFieldArray,
  SvgFieldObject,
  SvgFieldFile,
  SvgFieldRichtext,
  SvgFieldSelect,
  SvgFieldColor,
  SvgFieldTextarea,
} from "./spicaSvgIcons";

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
  | "invertColors"
  | "folderZip"
  | "movie"
  | "gridOn"
  | "ballot"
  | "gridView"
  | "viewList"
  | "sort"
  | "forkRight"
  | "filterCenterFocus"
  | "save"
  | "person"
  | "accountTree"
  | "notes"
  | "quota"
  | "logout"
  | "home"
  | "list"
  | "trashSimple"
  | "rename"
  | "download"
  | "extensions"
  | "fields"
  | "eyeOff"
  | "moon"
  | "sun"
  | "play"
  | "numberField"
  | "git"
  | "arrowUp"
  | "arrowDown"
  | "external"
  | "users"
  | "grip"
  | "search"
  | "fieldText"
  | "fieldNumber"
  | "fieldBoolean"
  | "fieldDate"
  | "fieldRelation"
  | "fieldLocation"
  | "fieldArray"
  | "fieldObject"
  | "fieldFile"
  | "fieldRichtext"
  | "fieldSelect"
  | "fieldColor"
  | "fieldTextarea";

export type IconSize = "xs" | "sm" | "md" | "lg" | number;

export const iconMap: {
  [key in IconName]: React.ComponentType<{ className?: string; style?: CSSProperties }>;
} = {
  article: ArticleIcon,
  clockOutline: QueryBuilderIcon,
  login: SvgLogin,
  google: GoogleIcon,
  facebook: FacebookOutlinedIcon,
  github: SvgGithub,
  sourceCommit: CommitIcon,
  check: SvgCheck,
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
  calendarBlank: SvgCalendar,
  checkboxBlankOutline: CheckBoxOutlineBlankIcon,
  security: SecurityIcon,
  formatSize: FormatSizeIcon,
  lock: SvgLock,
  filter: SvgFilter,
  layers: LayersIcon,
  key: VpnKeyIcon,
  accountCircle: AccountCircleIcon,
  fileMultiple: FileCopyIcon,
  contentCopy: SvgCopy,
  swapHorizontal: SwapHorizOutlinedIcon,
  fileDocument: SvgDocument,
  folder: FolderIcon,
  fullscreen: FullscreenIcon,
  pencil: SvgEdit,
  chevronRight: SvgChevronRight,
  codeTags: CodeIcon,
  chevronDown: SvgChevronDown,
  notificationClearAll: ClearAllIcon,
  dragHorizontalVariant: DragHandleIcon,
  dotsHorizontal: MoreHorizIcon,
  dotsVertical: SvgThreeDotsV,
  eye: SvgEye,
  refresh: RefreshIcon,
  plus: SvgAdd,
  delete: SvgTrash,
  minus: RemoveIcon,
  close: SvgClose,
  help: QuestionMarkOutlinedIcon,
  cog: SvgSettings,
  identities: SvgUsers,
  assetstore: LocalGroceryStoreIcon,
  dashboard: SvgDashboard,
  bucket: SvgBucket,
  function: SvgFunctions,
  webhook: WebhookIcon,
  storage: SvgStorage,
  chevronLeft: SvgChevronLeft,
  formatBold: FormatBoldIcon,
  formatItalic: FormatItalicIcon,
  formatUnderlined: FormatUnderlinedIcon,
  undo: UndoIcon,
  redo: RedoIcon,
  formatColorFill: FormatColorFillIcon,
  formatColorText: FormatColorTextIcon,
  strikethroughS: StrikethroughSIcon,
  invertColors: InvertColorsIcon,
  folderZip: FolderZipIcon,
  movie: MovieIcon,
  gridOn: GridOnIcon,
  ballot: BallotIcon,
  gridView: GridViewIcon,
  viewList: ViewListIcon,
  sort: SortIcon,
  forkRight: ForkRightIcon,
  filterCenterFocus: FilterCenterFocusIcon,
  save: SvgSave,
  person: SvgUser,
  accountTree: AccountTreeIcon,
  notes: NotesIcon,
  quota: DataUsageOutlinedIcon,
  logout: LogoutIcon,
  home: SvgHome,
  list: SvgList,
  trashSimple: SvgTrashSimple,
  rename: SvgRename,
  download: SvgDownload,
  extensions: SvgExtensions,
  fields: SvgFields,
  eyeOff: SvgEyeOff,
  moon: SvgMoon,
  sun: SvgSun,
  play: SvgPlay,
  numberField: SvgNumberField,
  git: SvgGit,
  arrowUp: SvgArrowUp,
  arrowDown: SvgArrowDown,
  external: SvgExternal,
  users: SvgUsers,
  grip: SvgGrip,
  search: SvgSearch,
  fieldText: SvgFieldText,
  fieldNumber: SvgFieldNumber,
  fieldBoolean: SvgFieldBoolean,
  fieldDate: SvgFieldDate,
  fieldRelation: SvgFieldRelation,
  fieldLocation: SvgFieldLocation,
  fieldArray: SvgFieldArray,
  fieldObject: SvgFieldObject,
  fieldFile: SvgFieldFile,
  fieldRichtext: SvgFieldRichtext,
  fieldSelect: SvgFieldSelect,
  fieldColor: SvgFieldColor,
  fieldTextarea: SvgFieldTextarea,
};
