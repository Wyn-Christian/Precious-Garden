import { useState } from "react";
import { PHPPrice, api_base_url } from "../app/utils";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { userSelector } from "../features/userSlice";
import {
  useAddToWishListMutation,
  useRemoveToWishListMutation,
} from "../app/services/wishlist";
import { enqueueSnackbar } from "notistack";

const ProductCard = ({ name, img_url, id, price, isWishlist }) => {
  const user = useSelector(userSelector);
  const [addToWishList] = useAddToWishListMutation();
  const [removeToWishList] = useRemoveToWishListMutation();

  const handleFavoriteButton = async () => {
    console.log({ isWishlist });
    if (user.id) {
      if (!isWishlist) {
        await addToWishList({ customer: user.id, product: id });
        enqueueSnackbar("Added to Wish list", { variant: "success" });
      } else {
        await removeToWishList({ customer: user.id, product: id });
        enqueueSnackbar("Removed to Wish list", { variant: "success" });
      }
    } else {
      enqueueSnackbar("Please Login First...", { variant: "warning" });
    }
  };

  return (
    <Grid xs={12} sm={6} md={4}>
      <Box>
        <Card
          elevation={0}
          sx={{
            width: { xs: 300, sm: 250, md: 225 },
            m: { xs: "auto", md: 0 },
          }}
        >
          <CardMedia
            image={`${api_base_url}${img_url}`}
            sx={{
              height: { xs: 300, sm: 250, md: 225 },
              width: { xs: 300, sm: 250, md: 225 },
              backgroundColor: (t) => t.palette.primary.main,
            }}
          >
            <IconButton
              onClick={handleFavoriteButton}
              sx={{
                top: "80%",
                left: 11,
                backgroundColor: "#eee",
                boxShadow: "1px 1px 3px",
              }}
              disableRipple
            >
              {isWishlist ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </CardMedia>
          <CardActionArea LinkComponent={Link} to={`/products/${id}`}>
            <CardContent sx={{ p: 1 }}>
              <Typography fontWeight="bold">{name}</Typography>
              <Typography variant="caption">
                {PHPPrice.format(price)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Grid>
  );
};
export default ProductCard;
