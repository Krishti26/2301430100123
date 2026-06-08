import { useEffect, useMemo, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import NotificationList from "../components/NotificationList.jsx";
import PrioritySelector from "../components/PrioritySelector.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";
import { Log } from "../services/logger.js";
import { sortByPriority } from "../utils/priorityUtils.js";

export default function PriorityNotifications() {
  const { notifications, loading, viewedIds, markAsRead } = useNotifications();
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    Log("frontend", "info", "page", "Priority page opened");
  }, []);

  const priorityNotifications = useMemo(
    () =>
      sortByPriority(notifications.filter((notification) => !viewedIds.includes(notification.id))).slice(
        0,
        limit,
      ),
    [limit, notifications, viewedIds],
  );

  return (
    <Box>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={900}>
          Priority Notifications
        </Typography>
        <Typography color="text.secondary">
          Unread notices are ranked by Placement, Result, Event, and then latest timestamp.
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ p: 2, mb: 3, border: "1px solid", borderColor: "divider" }}>
        <PrioritySelector value={limit} onChange={setLimit} />
      </Paper>

      <NotificationList
        notifications={priorityNotifications}
        loading={loading}
        viewedIds={viewedIds}
        onOpen={markAsRead}
      />
    </Box>
  );
}
