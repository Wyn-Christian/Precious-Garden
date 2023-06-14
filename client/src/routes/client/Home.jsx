import { Box, CardMedia, Divider, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import Map from "../../components/Map";
import Footer from "../../components/Footer";
function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <Box component={Slider} {...settings} sx={{ mb: 5 }}>
        {[1, 2, 3].map((num) => (
          <Box key={num}>
            <CardMedia
              image={`/images/home/${num}.png`}
              sx={{ height: { xs: 280, sm: 430, md: 600 } }}
            />
          </Box>
        ))}
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center" }}
      >
        <Box>
          <Box
            component="img"
            src="/images/home/product.png"
            sx={{ height: { xs: "30vh", md: "50vh" } }}
          />
        </Box>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h4" fontWeight="bold">
            Welcome to Precious Garden,
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Your ultimate destination for all things green and growing!
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: (theme) => theme.palette.primary.main }}
          />
        }
        spacing={3}
        textAlign="center"
        mt={10}
      >
        <Box width={{ xs: "100%" }}>
          <Typography variant="h4" fontWeight="bold">
            Mission
          </Typography>
          <Typography>
            Our goal is to bring a piece of nature into every house, which
            goes beyond the simple aesthetic value of an indoor plant. We
            want every house to be joyful because we really think that
            plants are the true source of joy.
          </Typography>
        </Box>
        <Box flexGrow={3}>
          <Typography variant="h4" fontWeight="bold">
            Vision
          </Typography>
          <Typography>
            We aim to carry out our responsibilities as individuals in
            protecting nature and its beauty by bringing a piece of nature
            into every home.
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
        mt={3}
      >
        <Box sx={{ flexGrow: 2, minWidth: { xs: "100%", md: "50vw" } }}>
          <Map height={512} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={{ xs: 1 }}
            justifyContent={"center"}
          >
            <Typography variant="h3" fontWeight="bold">
              OUR
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              STORE
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              LOCATION
            </Typography>
          </Stack>
          <Typography textAlign={{ xs: "center", md: "left" }}>
            Precious Garden was located at PENGE ADRESS DITO ILALAGAY
            GANERN SHA AYERN BASTA AYERN GANERN
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Home;
