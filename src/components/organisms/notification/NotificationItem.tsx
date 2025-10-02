import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { NotificationItemProps } from "./types";
import Icon from "../../atoms/icon/Icon";
import styles from "./Notification.module.scss";

function NotificationItem({
  notification,
  onClose,
  stackGap,
  rtl,
  duration: defaultDuration,
  style: externalStyle,
  animationDuration = 300,
}: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const hasStartedTimerRef = useRef<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const { config } = notification;
  const effectiveDuration = config.duration !== undefined ? config.duration : defaultDuration;

  const handleClose = useCallback(() => {
    if (isExiting) return;

    setIsExiting(true);
    config.onClose?.();

    onClose(notification.id);

    setTimeout(() => {}, animationDuration);
  }, [config, notification.id, onClose, animationDuration]);

  const startTimer = useCallback(
    (resumeFromPause = false) => {
      if (effectiveDuration === null || effectiveDuration <= 0 || isExiting) return;

      const remainingDuration = resumeFromPause
        ? Math.max(0, effectiveDuration - pausedTimeRef.current)
        : effectiveDuration;

      if (remainingDuration <= 0) {
        handleClose();
        return;
      }

      startTimeRef.current = Date.now() - (resumeFromPause ? pausedTimeRef.current : 0);

      if (!resumeFromPause) {
        setProgress(0);
        pausedTimeRef.current = 0;
      }

      timerRef.current = setTimeout(() => {
        handleClose();
      }, remainingDuration);

      const updateProgress = () => {
        if (startTimeRef.current === null || isExiting) return;

        const totalElapsed = Date.now() - startTimeRef.current;
        const progressPercentage = Math.min((totalElapsed / effectiveDuration) * 100, 100);
        setProgress(progressPercentage);

        if (progressPercentage < 100 && !isExiting) {
          progressTimerRef.current = setTimeout(updateProgress, 16);
        }
      };

      progressTimerRef.current = setTimeout(updateProgress, 16);
    },
    [effectiveDuration, handleClose]
  );

  const stopTimer = useCallback((trackPausedTime = false) => {
    if (trackPausedTime && startTimeRef.current !== null) {
      pausedTimeRef.current = Date.now() - startTimeRef.current;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    if (!trackPausedTime) {
      startTimeRef.current = null;
      pausedTimeRef.current = 0;
      hasStartedTimerRef.current = false;
    }
  }, []);

  const handleClick = useCallback(() => {
    config.onClick?.();
  }, [config]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopTimer(true);
  }, [stopTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!isExiting && effectiveDuration !== null && effectiveDuration > 0) {
      startTimer(true);
    }
  }, [startTimer, isExiting]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && config.closable !== false) {
        e.preventDefault();
        handleClose();
      }
    },
    [config.closable, handleClose]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isVisible && !isHovered && !isExiting && !hasStartedTimerRef.current) {
      hasStartedTimerRef.current = true;
      startTimer(false);
    }

    return () => stopTimer(false);
  }, [isVisible, isHovered, isExiting]);

  useEffect(() => {
    return () => {
      stopTimer(false);
    };
  }, [stopTimer]);

  const getNotificationType = () => {
    if (
      React.isValidElement(config.icon) &&
      typeof config.icon.props === "object" &&
      config.icon.props &&
      "className" in config.icon.props &&
      typeof config.icon.props.className === "string"
    ) {
      const className = config.icon.props.className;
      if (className.includes("success")) return "success";
      if (className.includes("error")) return "error";
      if (className.includes("warning")) return "warning";
      if (className.includes("info")) return "info";
      if (className.includes("loading")) return "loading";
    }
    return "default";
  };

  const getAriaRole = () => {
    if (
      React.isValidElement(config.icon) &&
      typeof config.icon.props === "object" &&
      config.icon.props &&
      "className" in config.icon.props &&
      typeof config.icon.props.className === "string" &&
      config.icon.props.className.includes("error")
    ) {
      return "alert";
    }
    return "status";
  };

  const getAriaLive = () => {
    if (
      React.isValidElement(config.icon) &&
      typeof config.icon.props === "object" &&
      config.icon.props &&
      "className" in config.icon.props &&
      typeof config.icon.props.className === "string" &&
      config.icon.props.className.includes("error")
    ) {
      return "assertive" as const;
    }
    return "polite" as const;
  };

  const showCloseButton = config.closable !== false;

  const appliedClasses = `
    ${styles.notificationItem}
    ${isVisible ? styles.enter : ""}
    ${isExiting ? styles.exit : ""}
    ${config.className || ""}
  `.trim();

  return (
    <div
      ref={itemRef}
      className={appliedClasses}
      style={{
        pointerEvents: "auto",
        ...config.style,
        ...externalStyle,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={config.btn ? 0 : -1}
      role={getAriaRole()}
      aria-live={getAriaLive()}
      data-placement={notification.placement}
      data-type={getNotificationType()}
      data-rtl={rtl}
    >
      {config.icon && <div className={styles.notificationIcon}>{config.icon}</div>}

      <div className={styles.notificationContent}>
        <div className={styles.notificationMessage}>{config.message}</div>

        {config.description && (
          <div className={styles.notificationDescription}>{config.description}</div>
        )}

        {config.btn && <div className={styles.notificationAction}>{config.btn}</div>}
      </div>

      {showCloseButton && (
        <button
          className={styles.notificationClose}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close notification"
          tabIndex={0}
        >
          {config.closeIcon || <Icon name="close" size="sm" />}
        </button>
      )}

      {effectiveDuration !== null && effectiveDuration > 0 && (
        <div className={styles.notificationProgressContainer}>
          <div
            className={styles.notificationProgress}
            style={{
              width: `${progress}%`,
              opacity: isHovered ? 0.3 : 1,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationItem;
