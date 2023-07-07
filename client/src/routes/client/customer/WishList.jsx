import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProductCard from "../../../components/ProductCart";
import { useGetProductsQuery } from "../../../app/services/product";
import { useSelector } from "react-redux";
import { userSelector } from "../../../features/userSlice";
import { useGetWishlistByUserQuery } from "../../../app/services/wishlist";

function WishList() {
	const { data: products = [] } = useGetProductsQuery();
	const user = useSelector(userSelector);
	const { data: wishlist = [] } = useGetWishlistByUserQuery(user.id);

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
				{products
					.filter((p) => wishlist.includes(p.id))
					.map((p) => (
						<ProductCard isWishlist key={p.id} {...p} />
					))}
			</Grid>
			{!wishlist.length && (
				<Typography textAlign="center" mt={3}>
					Add new wishlists in products...
				</Typography>
			)}
		</Box>
	);
}

export default WishList;
