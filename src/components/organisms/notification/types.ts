import { ReactNode, CSSProperties } from "react";

export type NotificationPlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface NotificationConfig {
  message: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  placement?: NotificationPlacement;
  duration?: number | null;
  closeIcon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  key?: string;
  className?: string;
  style?: CSSProperties;
  btn?: ReactNode;
}

export interface NotificationAPI {
  open: (config: NotificationConfig) => void;
  info: (config: Omit<NotificationConfig, "icon">) => void;
  success: (config: Omit<NotificationConfig, "icon">) => void;
  error: (config: Omit<NotificationConfig, "icon">) => void;
  warning: (config: Omit<NotificationConfig, "icon">) => void;
  loading: (config: Omit<NotificationConfig, "icon">) => void;
  destroy: (key?: string) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
  maxCount?: number;
  top?: number;
  bottom?: number;
  rtl?: boolean;
  zIndexBase?: number;
  duration?: number;
  stackGap?: number;
  placementDefaults?: Partial<Record<NotificationPlacement, Partial<NotificationConfig>>>;
  concurrent?: boolean;
  animationDuration?: number;
}

export interface NotificationInstance {
  id: string;
  config: NotificationConfig;
  placement: NotificationPlacement;
  instanceId: string;
  createdAt: number;
}

export interface NotificationContextValue {
  addNotification: (config: NotificationConfig, instanceId: string) => void;
  removeNotification: (key: string, instanceId: string) => void;
  updateNotification: (key: string, config: NotificationConfig, instanceId: string) => void;
  destroyNotifications: (key?: string, instanceId?: string) => void;
}

export interface NotificationItemProps {
  notification: NotificationInstance;
  onClose: (id: string) => void;
  stackGap: number;
  rtl: boolean;
  duration: number;
  style?: CSSProperties;
  animationDuration?: number;
}

export interface NotificationContainerProps {
  placement: NotificationPlacement;
  notifications: NotificationInstance[];
  onRemove: (id: string) => void;
  stackGap: number;
  rtl: boolean;
  duration: number;
  zIndex: number;
  top?: number;
  bottom?: number;
  animationDuration?: number;
}
