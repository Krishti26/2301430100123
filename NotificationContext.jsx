import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchNotifications } from "../api/notificationsApi.js";
import { VIEWED_NOTIFICATIONS_KEY } from "../utils/constants.js";

const NotificationContext = createContext(null);

function readViewedNotifications() {
  try {
    return JSON.parse(localStorage.getItem(VIEWED_NOTIFICATIONS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeViewedNotifications(ids) {
  localStorage.setItem(VIEWED_NOTIFICATIONS_KEY, JSON.stringify(ids));
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState(readViewedNotifications);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const refreshNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    const result = await fetchNotifications(params);
    setNotifications(result.notifications);
    setApiError(result.error || "");
    setLoading(false);
  }, []);

  const markAsRead = useCallback(
    (id) => {
      if (viewedIds.includes(id)) {
        return;
      }

      const nextViewedIds = [...viewedIds, id];
      setViewedIds(nextViewedIds);
      writeViewedNotifications(nextViewedIds);
    },
    [viewedIds],
  );

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !viewedIds.includes(notification.id)).length,
    [notifications, viewedIds],
  );

  const value = useMemo(
    () => ({
      notifications,
      loading,
      apiError,
      viewedIds,
      unreadCount,
      markAsRead,
      refreshNotifications,
    }),
    [apiError, loading, markAsRead, notifications, refreshNotifications, unreadCount, viewedIds],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
}
