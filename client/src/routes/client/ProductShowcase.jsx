import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PHPPrice, api_base_url } from "../../app/utils";
import { enqueueSnackbar } from "notistack";

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
import {
  useGetProductQuery,
  useViewProductMutation,
} from "../../app/services/product";
import LoadingProgress from "../../components/LoadingProgress";

import { userSelector } from "../../features/userSlice";
import {
  useAddToCartMutation,
  useGetCartByUserQuery,
} from "../../app/services/cart-item";

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
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useGetProductQuery(id);
  const [isFavorite, setIsFavorite] = useState(false);

  const user = useSelector(userSelector);
  const [viewProduct] = useViewProductMutation();
  const [addToCart] = useAddToCartMutation(user.id);
  const { data: cart_items = [] } = useGetCartByUserQuery(user.id);

  useEffect(() => {
    if (isSuccess) {
      viewProduct({ product: product.name });
    }
  }, [isSuccess]);

  const handleAddToCart = async () => {
    if (user.id) {
      if (!cart_items.some((e) => e.product.id === product.id)) {
        await addToCart({ customer: user.id, product: product.id })
          .unwrap()
          .then((res) => {
            enqueueSnackbar("Added to cart successfully!", {
              variant: "success",
            });
          });
      } else {
        enqueueSnackbar("Product is already in the Cart!", {
          variant: "warning",
          preventDuplicate: true,
        });
      }
    } else {
      enqueueSnackbar("Please Log in First!", {
        variant: "warning",
        preventDuplicate: true,
      });
    }
  };

  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
      <Box>
        <Typography variant="h2" textAlign="center" mt={18}>
          PRODUCT DETAIL
        </Typography>
        <Stack
          direction={{ md: "row" }}
          spacing={4}
          justifyContent="center"
        >
          <Box sx={{ width: { xs: "100%", md: 400 } }}>
            <Card
              sx={{
                width: { xs: 280, md: 400 },
                m: { xs: "auto", md: 0 },
              }}
              elevation={9}
            >
              <CardMedia
                sx={{
                  height: { xs: 280, md: 400 },
                  width: { xs: 280, md: 400 },
                  backgroundColor: (t) => t.palette.primary.main,
                }}
                image={`${api_base_url}${product.img_url}`}
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
                {product.name}
              </Typography>
              <Typography variant="h6">
                Category: {product.category}
              </Typography>
              <Typography variant="h6">
                Price: {PHPPrice.format(product.price)}
              </Typography>
              <Typography variant="h6">
                Stocks: {product.stocks}
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "row", md: "column" }}
              justifyContent={"center"}
            >
              <Button variant="contained" onClick={handleAddToCart}>
                Add To Cart
              </Button>
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
                {product.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        {product.category == "Plant" && (
          <Box mt={3}>
            <Typography textAlign="center" variant="h6" fontWeight="bold">
              PLANT SPECS
            </Typography>
            <Stack spacing={1}>
              <SpecInfo title="Type" value="Indoor" />
              <SpecInfo title="Height" value={`${product.height}"`} />
              <SpecInfo
                title="Pot Diameter"
                value={`${product.pot_diameter}"`}
              />
              <RatingInfo
                title="Light Requirements"
                value={product.light_requirements}
                Icon={LightModeIcon}
                EmptyIcon={LightModeOutlinedIcon}
              />
              <RatingInfo
                title="Humidity Needs"
                value={product.humidity_needs}
                Icon={LocalDrinkIcon}
                EmptyIcon={LocalDrinkOutlinedIcon}
              />
              <RatingInfo
                title="Watering Needs"
                value={product.watering_needs}
                Icon={WaterDropIcon}
                EmptyIcon={WaterDropOutlinedIcon}
              />
              <RatingInfo
                title="Repotting"
                value={product.repotting}
                Icon={YardIcon}
                EmptyIcon={YardOutlinedIcon}
              />
              <RatingInfo
                title="Pet Friendly"
                value={product.pet_friendly}
                Icon={PetsIcon}
                EmptyIcon={PetsOutlinedIcon}
              />
            </Stack>
          </Box>
        )}
      </Box>
    );
  }

  return <Box>{content}</Box>;
}

export default ProductShowcase;
