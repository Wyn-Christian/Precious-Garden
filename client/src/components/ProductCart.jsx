import { useState } from "react";
import { PHPPrice } from "../app/utils";
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

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
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
            image={"/images/sample/product.png"}
            sx={{
              height: { xs: 300, sm: 250, md: 225 },
              width: { xs: 300, sm: 250, md: 225 },
              backgroundColor: (t) => t.palette.primary.main,
            }}
          >
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                top: "80%",
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
          <CardActionArea LinkComponent={Link} to={`/products/1`}>
            <CardContent sx={{ p: 1 }}>
              <Typography fontWeight="bold">Product title</Typography>
              <Typography variant="caption">
                {PHPPrice.format(100)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Grid>
  );
};
export default ProductCard;
