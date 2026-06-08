import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const typeConfig = {
  Event: { color: "info", icon: <EventIcon fontSize="small" /> },
  Result: { color: "warning", icon: <SchoolIcon fontSize="small" /> },
  Placement: { color: "success", icon: <WorkIcon fontSize="small" /> },
};

export default function NotificationCard({ notification, isRead, onOpen }) {
  const config = typeConfig[notification.type] || typeConfig.Event;
  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(notification.timestamp));

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: isRead ? "divider" : "#2563eb",
        bgcolor: isRead ? "background.paper" : "#eff6ff",
        position: "relative",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Chip
            icon={config.icon}
            label={notification.type}
            color={config.color}
            size="small"
            variant="outlined"
          />
          <Chip
            label={isRead ? "Read" : "Unread"}
            color={isRead ? "default" : "primary"}
            size="small"
          />
        </Stack>

        <Typography variant="h6" component="h2" fontWeight={800} sx={{ mt: 2 }}>
          {notification.message}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, textTransform: "capitalize" }}>
          {notification.title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            {date}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {notification.id.slice(0, 8)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant={isRead ? "outlined" : "contained"} size="small" onClick={onOpen}>
          {isRead ? "Viewed" : "Mark as read"}
        </Button>
      </CardActions>
    </Card>
  );
}
