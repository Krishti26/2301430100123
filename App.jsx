import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from "@mui/icons-material/Menu";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AllNotifications from "./pages/AllNotifications.jsx";
import PriorityNotifications from "./pages/PriorityNotifications.jsx";
import { useNotifications } from "./context/NotificationContext.jsx";
import { Log } from "./services/logger.js";

const drawerWidth = 260;

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const location = useLocation();
  const { unreadCount, apiError } = useNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "Application started");
  }, []);

  const title = useMemo(
    () => (location.pathname === "/priority" ? "Priority Notifications" : "All Notifications"),
    [location.pathname],
  );

  const navItems = [
    { label: "All Notifications", to: "/", icon: <InboxIcon /> },
    { label: "Priority Notifications", to: "/priority", icon: <PriorityHighIcon /> },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight={800}>
          Campus Notify
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 800 }}>
            {title}
          </Typography>
          <Badge badgeContent={unreadCount} color="secondary">
            <InboxIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Container>
      </Box>

      <Snackbar
        open={Boolean(apiError) && snackbarOpen}
        message={apiError || ""}
        onClose={() => setSnackbarOpen(false)}
        action={
          <IconButton color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
