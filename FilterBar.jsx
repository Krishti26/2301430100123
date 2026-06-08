import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { NOTIFICATION_TYPES } from "../utils/constants.js";
import { Log } from "../services/logger.js";

export default function FilterBar({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
    Log("frontend", "info", "state", "Type filter changed");
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, border: "1px solid", borderColor: "divider" }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Notification Filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filter by type: Event, Result, or Placement.
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="type-filter-label">Type</InputLabel>
          <Select
            labelId="type-filter-label"
            value={value}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="">All Types</MenuItem>
            {NOTIFICATION_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
