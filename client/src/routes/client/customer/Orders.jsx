import { PHPPrice, api_base_url } from "../../../app/utils";
import { useSelector } from "react-redux";
import {
	useChangeStatusOrderMutation,
	useGetCheckoutsByUserQuery,
} from "../../../app/services/checkout";
import { userSelector } from "../../../features/userSlice";

import {
	Box,
	Button,
	CardMedia,
	Chip,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

const OrderItem = ({
	name,
	img_url,
	quantity,
	price,
	product,
	category,
}) => {
	return (
		<Box sx={{ display: "flex", mb: 3 }}>
			<Paper>
				<CardMedia
					sx={{
						width: { xs: 125, md: 90 },
						height: { xs: 125, md: 90 },
						backgroundColor: (t) => t.palette.primary.main,
					}}
					image={`${api_base_url}${img_url}`}
				/>
			</Paper>
			<Box
				sx={{
					ml: 3,
					display: "flex",
					flexGrow: 1,
					flexDirection: { xs: "column", md: "row" },
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 2,
					}}
				>
					<Typography fontWeight="bold" sx={{ width: { md: 375 } }}>
						{name}
					</Typography>
					<Typography variant="caption">{category}</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						justifyContent: "space-between",
						width: { md: 190 },
					}}
				>
					<Typography>Qty: {quantity}</Typography>
					<Typography width={{ md: 150 }}>
						Price: {PHPPrice.format(price)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

const OrderItems = ({
	id,
	checkout_items,
	total_quantity,
	total_price,
	status,
	created_at,
}) => {
	const [changeStatusOrder] = useChangeStatusOrderMutation();

	const handleCancelClick = async () => {
		await changeStatusOrder({ id, data: { status: "Cancelled" } })
			.unwrap()
			.then(() =>
				enqueueSnackbar("Checkout Cancelled Successfully!", {
					variant: "success",
				})
			);
	};

	return (
		<Paper elevation={0}>
			<Box
				sx={{
					p: "10px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box>
					<StatusInfo status={status} />
				</Box>
				<Button
					variant="contained"
					onClick={handleCancelClick}
					disabled={status !== "To Process"}
				>
					Cancel
				</Button>
			</Box>
			<Divider />
			<Box sx={{ p: "10px 20px" }}>
				{checkout_items.map((item) => (
					<OrderItem key={item.id} {...item} />
				))}
			</Box>
			<Divider />
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				px={3}
				pt={2}
			>
				<Typography>Ordered on: {created_at}</Typography>
				<Typography>
					Total({total_quantity} items): {PHPPrice.format(total_price)}
				</Typography>
			</Stack>
		</Paper>
	);
};

const StatusInfo = ({ status }) => {
	let content;
	switch (status) {
		case "To Process":
			content = <Chip label="To Process" color="warning" />;
			break;
		case "On Its Way":
			content = <Chip label="On Its Way" color="info" />;
			break;
		case "Delivered":
			content = <Chip label="Delivered" color="success" />;
			break;
		case "Cancelled":
			content = <Chip label="Cancelled" color="error" />;
			break;
		case "Rejected":
			content = <Chip label="Rejected" color="error" />;
			break;
	}
	return content;
};

function Orders() {
	const user = useSelector(userSelector);
	const { data: checkouts = [] } = useGetCheckoutsByUserQuery(user.id);
	return (
		<Box>
			<Typography
				variant="h3"
				textAlign="center"
				mt={18}
				fontWeight="bold"
			>
				ORDER HISTORY
			</Typography>
			<Stack spacing={3}>
				{checkouts.map((checkout) => (
					<OrderItems key={checkout.id} {...checkout} />
				))}
			</Stack>
		</Box>
	);
}

export default Orders;
