import { AppBar, Box, Container, Stack, Typography } from "@mui/material";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <AppBar position="relative">
      <Container>
        <Stack
          direction={{ md: "row" }}
          pt={10}
          pb={5}
          justifyContent={{ xs: "center", md: "space-evenly" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={{ xs: 2, md: 0 }}
        >
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold">
              Precious Garden
            </Typography>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <FacebookOutlinedIcon sx={{ fontSize: 60 }} />
              <EmailIcon sx={{ fontSize: 60 }} />
              <Box component="img" src="/images/gcash.svg" height={66} />
            </Stack>
          </Box>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold">
              Opening Time
            </Typography>
            <Typography variant="h6">Weekdays: 6 AM - 7 PM</Typography>
            <Typography variant="h6">Weekends: 8 AM - 5 PM</Typography>
          </Box>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold">
              Contact Us
            </Typography>
            <Typography variant="h6">Landline: 000-0000</Typography>
            <Typography variant="h6">Mobile: 09111111111</Typography>
          </Box>
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Footer;
