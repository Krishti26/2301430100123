import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard.jsx";

export default function NotificationList({ notifications, loading, viewedIds, onOpen }) {
  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 6, textAlign: "center", border: "1px solid", borderColor: "divider" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading notifications...</Typography>
      </Paper>
    );
  }

  if (!notifications.length) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: "center", border: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={800}>
          No notifications found
        </Typography>
        <Typography color="text.secondary">Try changing the filter or page size.</Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {notifications.map((notification) => (
        <Grid item xs={12} md={6} key={notification.id}>
          <NotificationCard
            notification={notification}
            isRead={viewedIds.includes(notification.id)}
            onOpen={() => onOpen(notification.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
