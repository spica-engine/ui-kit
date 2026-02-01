import React, { FC } from "react";
import { NotificationContainerProps, NotificationPlacement } from "./types";
import NotificationItem from "./NotificationItem";
import styles from "./Notification.module.scss";

const NotificationContainer: FC<NotificationContainerProps> = ({
  placement,
  notifications,
  onRemove,
  stackGap,
  rtl,
  duration,
  zIndex,
  top,
  bottom,
  animationDuration = 300,
}) => {
  if (notifications.length === 0) {
    return null;
  }

  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "fixed",
      zIndex,
      display: "flex",
      flexDirection: "column",
      gap: stackGap,
      pointerEvents: "none",
    };

    const effectivePlacement = rtl ? flipPlacementForRTL(placement) : placement;

    switch (effectivePlacement) {
      case "topLeft":
        return {
          ...baseStyles,
          top: top,
          left: 24,
          alignItems: "flex-start",
        };
      case "topRight":
        return {
          ...baseStyles,
          top: top,
          right: 24,
          alignItems: "flex-end",
        };
      case "bottomLeft":
        return {
          ...baseStyles,
          bottom: bottom,
          left: 24,
          alignItems: "flex-start",
          flexDirection: "column-reverse",
        };
      case "bottomRight":
        return {
          ...baseStyles,
          bottom: bottom,
          right: 24,
          alignItems: "flex-end",
          flexDirection: "column-reverse",
        };
      default:
        return baseStyles;
    }
  };

  const flipPlacementForRTL = (placement: NotificationPlacement): NotificationPlacement => {
    switch (placement) {
      case "topLeft":
        return "topRight";
      case "topRight":
        return "topLeft";
      case "bottomLeft":
        return "bottomRight";
      case "bottomRight":
        return "bottomLeft";
      default:
        return placement;
    }
  };

  return (
    <div
      className={`${styles.notificationContainer} ${styles[placement]}`}
      style={getPositionStyles()}
    >
      {notifications
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((notification, index) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onRemove}
            stackGap={stackGap}
            rtl={rtl}
            duration={duration}
            animationDuration={animationDuration}
            style={{
              zIndex: zIndex + index,
            }}
          />
        ))}
    </div>
  );
};

export default NotificationContainer;
