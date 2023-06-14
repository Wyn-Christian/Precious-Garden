import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

function Signup() {
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        SIGN-UP
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{ width: { xs: "100%", sm: 500, md: 700 } }}
          elevation={0}
        >
          <Box component="form">
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  PERSONAL INFO
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField label="Full Name" variant="filled" fullWidth />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField label="Username" variant="filled" fullWidth />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Profile Pic"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Current Address"
                  variant="filled"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
              <Grid xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  PERSONAL ACCOUNT
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField label="Email" variant="filled" fullWidth />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Re-enter Password"
                  type="password"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Button variant="contained" fullWidth>
                  Create an account
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Signup;
