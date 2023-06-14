import { useState } from "react";
import { useParams } from "react-router-dom";
import { PHPPrice } from "../../app/utils";

import {
  Box,
  Card,
  CardMedia,
  Stack,
  IconButton,
  Typography,
  Button,
  Rating,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Rating Icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import YardIcon from "@mui/icons-material/Yard";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import PetsIcon from "@mui/icons-material/Pets";

const SpecInfo = ({ title, value }) => (
  <Stack direction="row" spacing={2} justifyContent="center">
    <Typography textAlign="right" sx={{ width: { xs: 300, md: 500 } }}>
      {title}:
    </Typography>
    <Typography sx={{ width: 500 }}>{value}</Typography>
  </Stack>
);

const RatingInfo = ({ title, value, Icon, EmptyIcon }) => (
  <Stack
    direction="row"
    spacing={2}
    justifyContent="center"
    alignItems="center"
  >
    <Typography textAlign="right" sx={{ width: { xs: 300, md: 500 } }}>
      {title}:
    </Typography>
    <Rating
      value={value}
      sx={{ width: 500 }}
      icon={<Icon fontSize="inherit" />}
      emptyIcon={<EmptyIcon fontSize="inherit" />}
      size="large"
      readOnly
    />
  </Stack>
);

function ProductShowcase() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Box>
      <Typography variant="h2" textAlign="center" mt={18}>
        PRODUCT DETAIL
      </Typography>
      <Stack direction={{ md: "row" }} spacing={4}>
        <Box sx={{ width: { xs: "100%", md: 400 } }}>
          <Card
            sx={{ width: { xs: 280, md: 400 }, m: { xs: "auto", md: 0 } }}
            elevation={9}
          >
            <CardMedia
              sx={{
                height: { xs: 280, md: 400 },
                width: { xs: 280, md: 400 },
                backgroundColor: (t) => t.palette.primary.main,
              }}
              image={`/images/sample/product.png`}
            >
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  top: { xs: "80%", md: "85%" },
                  left: 11,
                  backgroundColor: "#eee",
                  boxShadow: "1px 1px 3px",
                }}
                disableRipple
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </CardMedia>
          </Card>
        </Box>
        <Stack mt={{ xs: 3, md: 0 }}>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold">
              [Product name]
            </Typography>
            <Typography variant="h6">Category: [Plant]</Typography>
            <Typography variant="h6">
              Price: {PHPPrice.format(100)}
            </Typography>
            <Typography variant="h6">Stocks: [Product Stock]</Typography>
          </Box>
          <Stack
            direction={{ xs: "row", md: "column" }}
            justifyContent={"center"}
          >
            <Button variant="contained">Add To Cart</Button>
          </Stack>
        </Stack>
      </Stack>
      <Box mt={3}>
        <Typography textAlign="center" variant="h5" fontWeight="bold">
          PRODUCT DESCRIPTION
        </Typography>

        <Box>
          <Stack direction="row" justifyContent="center">
            <Typography textAlign="right" mr={3} sx={{ width: 300 }}>
              Description:
            </Typography>
            <Typography sx={{ width: 500 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facere, a quisquam enim incidunt eius soluta distinctio id,
              impedit quae adipisci, assumenda quas voluptatum reiciendis
              voluptatem hic totam animi ipsam! Reprehenderit.
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography textAlign="center" variant="h6" fontWeight="bold">
          PLANT SPECS
        </Typography>
        <Stack spacing={1}>
          <SpecInfo title="Type" value="Indoor" />
          <SpecInfo title="Height" value={`12"`} />
          <SpecInfo title="Pot Diameter" value={`12"`} />
          <RatingInfo
            title="Light Requirements"
            value={3}
            Icon={LightModeIcon}
            EmptyIcon={LightModeOutlinedIcon}
          />
          <RatingInfo
            title="Humidity Needs"
            value={3}
            Icon={LocalDrinkIcon}
            EmptyIcon={LocalDrinkOutlinedIcon}
          />
          <RatingInfo
            title="Watering Needs"
            value={3}
            Icon={WaterDropIcon}
            EmptyIcon={WaterDropOutlinedIcon}
          />
          <RatingInfo
            title="Repotting"
            value={3}
            Icon={YardIcon}
            EmptyIcon={YardOutlinedIcon}
          />
          <RatingInfo
            title="Pet Friendly"
            value={3}
            Icon={PetsIcon}
            EmptyIcon={PetsOutlinedIcon}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ProductShowcase;
