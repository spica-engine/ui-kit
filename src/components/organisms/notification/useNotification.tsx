import React, { useCallback, useMemo, useId } from "react";
import { NotificationAPI, NotificationConfig } from "./types";
import { useNotificationContext } from "./NotificationProvider";
import Icon from "../../atoms/icon/Icon";

const useNotification = (): [NotificationAPI, React.ComponentType] => {
  const instanceId = useId();
  const context = useNotificationContext();

  const api = useMemo<NotificationAPI>(() => {
    const open = (config: NotificationConfig) => {
      context.addNotification(config, instanceId);
    };

    const info = (config: Omit<NotificationConfig, "icon">) => {
      open({
        ...config,
        icon: <Icon name="help" className="notification-icon-info" />,
      });
    };

    const success = (config: Omit<NotificationConfig, "icon">) => {
      open({
        ...config,
        icon: <Icon name="check" className="notification-icon-success" />,
      });
    };

    const error = (config: Omit<NotificationConfig, "icon">) => {
      open({
        ...config,
        icon: <Icon name="close" className="notification-icon-error" />,
      });
    };

    const warning = (config: Omit<NotificationConfig, "icon">) => {
      open({
        ...config,
        icon: <Icon name="notificationClearAll" className="notification-icon-warning" />,
      });
    };

    const loading = (config: Omit<NotificationConfig, "icon">) => {
      open({
        ...config,
        icon: <Icon name="refresh" className="notification-icon-loading" />,
        duration: null, // Loading notifications persist by default
      });
    };

    const destroy = (key?: string) => {
      context.destroyNotifications(key, instanceId);
    };

    return {
      open,
      info,
      success,
      error,
      warning,
      loading,
      destroy,
    };
  }, [context, instanceId]);

  // Context holder component - this registers the hook instance with the provider
  const ContextHolder = useCallback(() => {
    // This component doesn't render anything, it just ensures the hook is connected
    // to the provider context. The actual rendering is handled by the provider.
    return null;
  }, []);

  return [api, ContextHolder];
};

export default useNotification;
