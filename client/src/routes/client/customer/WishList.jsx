import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProductCard from "../../../components/ProductCart";

function WishList() {
  return (
    <Box>
      <Typography
        textAlign="center"
        variant="h2"
        fontWeight="bold"
        mt={18}
      >
        WISHLISTS
      </Typography>
      <Grid container spacing={3}>
        <ProductCard />
      </Grid>
    </Box>
  );
}

export default WishList;
