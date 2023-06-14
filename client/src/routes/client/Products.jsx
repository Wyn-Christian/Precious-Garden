import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProductCard from "../../components/ProductCart";

function Products() {
  const [category, setCategory] = useState("all products");

  const handleCategory = (event, newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Box>
      <Typography
        textAlign="center"
        variant="h2"
        fontWeight="bold"
        mt={18}
      >
        PRODUCTS
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategory}
          sx={{
            flexDirection: { xs: "row", md: "column" },
            position: { md: "sticky" },
            top: 125,
            height: "100%",
            m: { xs: "auto", md: 0 },
          }}
        >
          {["All Products", "Plants", "Pots", "Soils", "Tools"].map(
            (cat) => (
              <ToggleButton key={cat} value={cat.toLowerCase()}>
                {cat}
              </ToggleButton>
            )
          )}
        </ToggleButtonGroup>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCard key={i} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default Products;
