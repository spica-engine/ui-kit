import React, { createContext, useContext, useState, useCallback, useMemo, FC } from "react";
import {
  NotificationProviderProps,
  NotificationContextValue,
  NotificationInstance,
  NotificationConfig,
  NotificationPlacement,
} from "./types";
import NotificationContainer from "./NotificationContainer";
import Portal from "../../atoms/portal/Portal";
import styles from "./Notification.module.scss";

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within NotificationProvider");
  }
  return context;
};

const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
  maxCount = 5,
  top = 24,
  bottom = 24,
  rtl = false,
  zIndexBase = 1000,
  duration = 4500,
  stackGap = 12,
  placementDefaults = {},
  concurrent = true,
  animationDuration = 300,
}) => {
  const [notifications, setNotifications] = useState<NotificationInstance[]>([]);

  const addNotification = useCallback(
    (config: NotificationConfig, instanceId: string) => {
      const placement = config.placement || "topRight";
      const id =
        config.key || `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newNotification: NotificationInstance = {
        id,
        config: {
          ...placementDefaults[placement],
          ...config,
          placement,
        },
        placement,
        instanceId,
        createdAt: Date.now(),
      };

      setNotifications((prev) => {
        if (config.key) {
          const existingIndex = prev.findIndex(
            (n) => n.config.key === config.key && n.instanceId === instanceId
          );

          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              config: newNotification.config,
              createdAt: Date.now(),
            };
            return updated;
          }
        }

        const updated = [...prev, newNotification];

        const placementNotifications = updated.filter(
          (n) => n.placement === placement && n.instanceId === instanceId
        );

        if (placementNotifications.length > maxCount) {
          const sortedByAge = placementNotifications.sort((a, b) => a.createdAt - b.createdAt);
          const toRemove = sortedByAge.slice(0, placementNotifications.length - maxCount);

          toRemove.forEach((n) => {
            setTimeout(() => n.config.onClose?.(), 0);
          });

          return updated.filter((n) => !toRemove.some((r) => r.id === n.id));
        }

        return updated;
      });
    },
    [maxCount, placementDefaults]
  );

  const removeNotification = useCallback((id: string, instanceId: string) => {
    setNotifications((prev) => prev.filter((n) => !(n.id === id && n.instanceId === instanceId)));
  }, []);

  const updateNotification = useCallback(
    (key: string, config: NotificationConfig, instanceId: string) => {
      setNotifications((prev) =>
        prev.map((n) => {
          if (n.config.key === key && n.instanceId === instanceId) {
            return {
              ...n,
              config: {
                ...n.config,
                ...config,
              },
            };
          }
          return n;
        })
      );
    },
    []
  );

  const destroyNotifications = useCallback((key?: string, instanceId?: string) => {
    setNotifications((prev) => {
      if (!key && !instanceId) {
        prev.forEach((n) => n.config.onClose?.());
        return [];
      }

      if (key && instanceId) {
        const toRemove = prev.filter((n) => n.config.key === key && n.instanceId === instanceId);
        toRemove.forEach((n) => n.config.onClose?.());
        return prev.filter((n) => !(n.config.key === key && n.instanceId === instanceId));
      }

      if (instanceId) {
        const toRemove = prev.filter((n) => n.instanceId === instanceId);
        toRemove.forEach((n) => n.config.onClose?.());
        return prev.filter((n) => n.instanceId !== instanceId);
      }

      if (key) {
        const toRemove = prev.filter((n) => n.config.key === key);
        toRemove.forEach((n) => n.config.onClose?.());
        return prev.filter((n) => n.config.key !== key);
      }

      return prev;
    });
  }, []);

  const contextValue = useMemo<NotificationContextValue>(
    () => ({
      addNotification,
      removeNotification,
      updateNotification,
      destroyNotifications,
    }),
    [addNotification, removeNotification, updateNotification, destroyNotifications]
  );

  const notificationsByPlacement = useMemo(() => {
    const grouped: Partial<Record<NotificationPlacement, NotificationInstance[]>> = {};

    notifications.forEach((notification) => {
      const placement = notification.placement;
      if (!grouped[placement]) {
        grouped[placement] = [];
      }
      grouped[placement]!.push(notification);
    });

    return grouped;
  }, [notifications]);

  const placements: NotificationPlacement[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {placements.map((placement) => {
        const placementNotifications = notificationsByPlacement[placement] || [];

        if (placementNotifications.length === 0) return null;

        return (
          <Portal key={placement} className={styles.notificationPortal}>
            <NotificationContainer
              placement={placement}
              notifications={placementNotifications}
              onRemove={(id: string) => {
                const notification = placementNotifications.find((n) => n.id === id);
                if (notification) {
                  removeNotification(id, notification.instanceId);
                }
              }}
              stackGap={stackGap}
              rtl={rtl}
              duration={duration}
              zIndex={zIndexBase}
              top={top}
              bottom={bottom}
              animationDuration={animationDuration}
            />
          </Portal>
        );
      })}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
