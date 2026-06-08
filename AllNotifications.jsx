import { useMemo, useState } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import FilterBar from "../components/FilterBar.jsx";
import NotificationList from "../components/NotificationList.jsx";
import { DEFAULT_PAGE_SIZE } from "../utils/constants.js";
import { useNotifications } from "../context/NotificationContext.jsx";

export default function AllNotifications() {
  const { notifications, loading, viewedIds, markAsRead } = useNotifications();
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredNotifications = useMemo(
    () =>
      typeFilter
        ? notifications.filter((notification) => notification.type === typeFilter)
        : notifications,
    [notifications, typeFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filteredNotifications.length / DEFAULT_PAGE_SIZE));
  const visibleNotifications = filteredNotifications.slice(
    (page - 1) * DEFAULT_PAGE_SIZE,
    page * DEFAULT_PAGE_SIZE,
  );

  const handleFilterChange = (nextType) => {
    setTypeFilter(nextType);
    setPage(1);
  };

  return (
    <Box>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={900}>
          All Notifications
        </Typography>
        <Typography color="text.secondary">
          Notices fetched from the protected campus notifications API.
        </Typography>
      </Stack>

      <FilterBar value={typeFilter} onChange={handleFilterChange} />

      <NotificationList
        notifications={visibleNotifications}
        loading={loading}
        viewedIds={viewedIds}
        onOpen={markAsRead}
      />

      {!loading && filteredNotifications.length > DEFAULT_PAGE_SIZE && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            color="primary"
            count={pageCount}
            page={page}
            onChange={(_, nextPage) => setPage(nextPage)}
          />
        </Stack>
      )}
    </Box>
  );
}
