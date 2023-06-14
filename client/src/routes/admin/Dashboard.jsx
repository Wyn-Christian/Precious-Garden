import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import PixIcon from "@mui/icons-material/Pix";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GrassIcon from "@mui/icons-material/Grass";
import AdminTitle from "../../components/AdminTitle";

const DataSummary = ({ title, num, Icon }) => {
  return (
    <Grid xs={12} md={6} lg={3}>
      <Paper
        elevation={3}
        sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Icon
            sx={{
              fontSize: 50,
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </Box>
        <Box textAlign="end">
          <Typography variant="h5">{num}</Typography>
          <Typography variant="body1">{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

function Dashboard() {
  return (
    <Box>
      <AdminTitle title="Dashboard " />
      <Box>
        <Grid container spacing={3}>
          <DataSummary title="Customers" num={3} Icon={GroupIcon} />
          <DataSummary title="Total Products" num={3} Icon={GrassIcon} />
          <DataSummary
            title="Pending Orders"
            num={3}
            Icon={LocalShippingIcon}
          />
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
