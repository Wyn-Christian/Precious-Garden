import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
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
        LOGIN
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100%",
          width: "100%",
        }}
      >
        <Paper sx={{ width: { xs: "100%", sm: 400 } }} elevation={0}>
          <Box component="form">
            <Stack spacing={3}>
              <TextField label="Email" variant="filled" fullWidth />
              <TextField label="Password" variant="filled" fullWidth />
              <Button variant="contained">Login</Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
