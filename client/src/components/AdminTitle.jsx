import { Typography } from "@mui/material";

function AdminTitle({ title }) {
  return (
    <Typography
      variant="h4"
      sx={{
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
        pl: 2,
        mb: 5,
      }}
    >
      {title}
    </Typography>
  );
}

export default AdminTitle;
