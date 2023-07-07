import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProductCard from "../../components/ProductCart";
import { useGetProductsQuery } from "../../app/services/product";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/userSlice";
import { useGetWishlistByUserQuery } from "../../app/services/wishlist";

function Products() {
	const [category, setCategory] = useState("All");
	const {
		data: products = [],
		isLoading,
		isSuccess,
	} = useGetProductsQuery();

	const user = useSelector(userSelector);

	const { data: wishlist = [] } = useGetWishlistByUserQuery(user.id);

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
					{[
						{ name: "All Products", value: "All" },
						{ name: "Plants", value: "Plant" },
						{ name: "Pots", value: "Pot" },
						{ name: "Soils", value: "Soil" },
						{ name: "Tools", value: "Tool" },
					].map((cat) => (
						<ToggleButton
							key={cat.name}
							value={cat.value}
							sx={{ fontSize: { xs: 11, sm: 15, md: "0.8rem" } }}
						>
							{cat.name}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
				<Grid container spacing={3}>
					{products
						.filter((p) => p.category === category || category === "All")
						.map((product) => (
							<ProductCard
								key={product.id}
								{...product}
								isWishlist={wishlist.includes(product.id)}
							/>
						))}
				</Grid>
			</Stack>
		</Box>
	);
}

export default Products;
