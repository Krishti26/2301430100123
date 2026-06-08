import { PRIORITY_WEIGHTS } from "./constants.js";

export function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const weightDiff = (PRIORITY_WEIGHTS[b.type] || 0) - (PRIORITY_WEIGHTS[a.type] || 0);

    if (weightDiff !== 0) {
      return weightDiff;
    }

    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}

export function normalizeNotification(raw, index) {
  const type = raw.type || raw.Type || raw.notification_type || "Event";
  const message = raw.message || raw.Message || raw.description || "No message provided.";

  return {
    id: raw.id || raw.ID || raw._id || raw.notification_id || `${type}-${index}`,
    title: raw.title || raw.Title || `${type} notice`,
    message,
    type,
    timestamp: raw.timestamp || raw.Timestamp || raw.created_at || new Date().toISOString(),
  };
}
