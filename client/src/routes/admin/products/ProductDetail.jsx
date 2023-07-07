import { Link, useNavigate, useParams } from "react-router-dom";
import { PHPPrice, api_base_url } from "../../../app/utils";

// MUI Components
import {
	Backdrop,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Paper,
	Rating,
	Stack,
	Typography,
} from "@mui/material";

// Custom Components
import AdminTitle from "../../../components/AdminTitle";
import DetailTitle from "../../../components/DetailTitle";
import DetailInfo from "../../../components/DetailInfo";

// MUI icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
	useDeleteProductMutation,
	useGetProductQuery,
} from "../../../app/services/product";
import LoadingProgress from "../../../components/LoadingProgress";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const RatingInfo = ({ title, value, Icon, EmptyIcon }) => (
	<Box>
		<Box sx={{ pt: 1.5, pl: 1 }}>
			<Typography component="legend">{title}</Typography>
			<Rating
				value={value}
				icon={<Icon fontSize="inherit" />}
				emptyIcon={<EmptyIcon fontSize="inherit" />}
				size="large"
				readOnly
			/>
		</Box>
		<Divider />
	</Box>
);

function DeletePrompt({ id, open, handleClose }) {
	const navigate = useNavigate();
	const [deleteProduct] = useDeleteProductMutation();

	const onYesCliecked = async () => {
		await deleteProduct(id)
			.unwrap()
			.then((res) => {
				enqueueSnackbar("Product Deleted Successfully!", {
					variant: "success",
				});
				navigate("/admin/products/list");
			});
	};

	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={open}
		>
			<Card sx={{ width: { xs: "90%", sm: 300, md: 400 } }}>
				<CardContent>
					<Typography>
						Are you sure you want to permanently delete this product?
					</Typography>
				</CardContent>
				<CardActions sx={{ justifyContent: "center", gap: 3 }}>
					<Button
						variant="contained"
						color="error"
						onClick={onYesCliecked}
					>
						Yes
					</Button>
					<Button variant="contained" onClick={handleClose}>
						Cancel
					</Button>
				</CardActions>
			</Card>
		</Backdrop>
	);
}

function ProductDetail() {
	const { id } = useParams();

	const { data = [], isLoading, isSuccess } = useGetProductQuery(id);

	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	let content;
	if (isLoading) {
		content = <LoadingProgress />;
	} else if (isSuccess) {
		content = (
			<Box>
				<AdminTitle title="Product Detail" />
				<Box
					display="flex"
					justifyContent="space-between"
					sx={{
						flexDirection: { xs: "column", md: "row" },
						alignItems: { xs: "center", md: "flex-end" },
					}}
				>
					<Box>
						<Typography variant="overline">PRODUCT ID:</Typography>
						<Chip label={id} size="small" />
					</Box>

					<Stack direction="row" spacing={3}>
						<Button variant="contained" color="error" onClick={handleOpen}>
							<DeleteForeverRoundedIcon sx={{ mr: 1, fontSize: 16 }} />
							Delete
						</Button>
						<Button
							variant="contained"
							color="primary"
							LinkComponent={Link}
							to={`/admin/products/${id}/update`}
						>
							<BorderColorIcon sx={{ mr: 1, fontSize: 16 }} />
							Edit
						</Button>
					</Stack>
				</Box>

				<Box
					sx={{
						mt: 3,
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: { xs: "stretch", md: "flex-start" },
					}}
				>
					<Box
						sx={{
							position: { md: "sticky" },
							top: 100,
							alignSelf: { sm: "center", md: "flex-start" },
						}}
					>
						<Paper sx={{ width: { xs: 200, md: 300 } }} elevation={6}>
							<CardMedia
								image={`${api_base_url}${data.img_url}`}
								sx={{
									height: { xs: 200, md: 300 },
									width: { xs: 200, md: 300 },
									backgroundColor: (theme) => theme.palette.primary.main,
								}}
							/>
						</Paper>
					</Box>

					<Stack
						direction="column"
						sx={{ flexGrow: 1, ml: { md: 3 }, mt: { xs: 3, md: 0 } }}
						spacing={3}
					>
						<Paper>
							<DetailTitle title="BASIC INFO" />
							<DetailInfo title="Name" value={data.name} />
							<DetailInfo title="Description" value={data.description} />
							<DetailInfo title="Category" value={data.category} />
							<DetailInfo
								title="Price"
								value={PHPPrice.format(data.price)}
							/>
							<DetailInfo title="Stocks" value={data.stocks} />
							<DetailInfo title="No. of Sold" value={21} />
						</Paper>
						{data.category == "Plant" && (
							<Paper>
								<DetailTitle title="PLANT INFO" />
								<DetailInfo title="Type" value={data.type} />
								<DetailInfo title="height" value={data.height} />
								<DetailInfo
									title="Pot Diameter"
									value={data.pot_diameter}
								/>
							</Paper>
						)}
						{data.category == "Plant" && (
							<Paper>
								<DetailTitle title="PLANT SPECS" />

								<RatingInfo
									title="Light Requirements"
									value={data.light_requirements}
									Icon={LightModeIcon}
									EmptyIcon={LightModeOutlinedIcon}
								/>
								<RatingInfo
									title="Humidity Needs"
									value={data.humidity_needs}
									Icon={LocalDrinkIcon}
									EmptyIcon={LocalDrinkOutlinedIcon}
								/>
								<RatingInfo
									title="Watering Needs"
									value={data.watering_needs}
									Icon={WaterDropIcon}
									EmptyIcon={WaterDropOutlinedIcon}
								/>
								<RatingInfo
									title="Repotting"
									value={data.repotting}
									Icon={YardIcon}
									EmptyIcon={YardOutlinedIcon}
								/>
								<RatingInfo
									title="Pet Friendly"
									value={data.pet_friendly}
									Icon={PetsIcon}
									EmptyIcon={PetsOutlinedIcon}
								/>
							</Paper>
						)}
					</Stack>
				</Box>
				<DeletePrompt id={id} open={open} handleClose={handleClose} />
			</Box>
		);
	}

	return <Box sx={{ mb: 10 }}>{content}</Box>;
}

export default ProductDetail;
