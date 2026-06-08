import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";

export default function PrioritySelector({ value, onChange }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={2}>
      <Typography sx={{ flexGrow: 1 }} color="text.secondary">
        Display only top N notifications after sorting by weight and recency.
      </Typography>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="priority-limit-label">Top N</InputLabel>
        <Select
          labelId="priority-limit-label"
          value={value}
          label="Top N"
          onChange={(event) => onChange(Number(event.target.value))}
        >
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={15}>Top 15</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
