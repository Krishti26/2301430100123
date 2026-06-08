import { DEFAULT_API_BASE_URL } from "../utils/constants.js";
import { normalizeNotification } from "../utils/priorityUtils.js";
import { Log } from "../services/logger.js";

const API_BASE_URL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const TOKEN = (import.meta.env.VITE_BEARER_TOKEN || "").trim().replace(/^['"]|['"]$/g, "");

export async function fetchNotifications({ page, limit, notification_type = "" } = {}) {
  await Log("frontend", "info", "api", "Fetching notifications");

  const query = new URLSearchParams();

  if (page) {
    query.set("page", String(page));
  }

  if (limit) {
    query.set("limit", String(limit));
  }

  if (notification_type) {
    query.set("notification_type", notification_type);
  }

  try {
    if (!TOKEN) {
      throw new Error("Missing bearer token");
    }

    const queryString = query.toString();
    const url = `${API_BASE_URL}/evaluation-service/notifications${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Notifications request failed with status ${response.status}`);
    }

    const data = await response.json();
    const list = Array.isArray(data) ? data : data.notifications || data.data || [];

    await Log("frontend", "info", "api", "Notifications fetched");
    return {
      notifications: list.map(normalizeNotification),
      fromDemo: false,
    };
  } catch (error) {
    await Log("frontend", "error", "api", error.message);

    return {
      notifications: [],
      fromDemo: false,
      error: error.message,
    };
  }
}
