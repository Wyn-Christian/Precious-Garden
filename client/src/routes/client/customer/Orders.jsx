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
import { PHPPrice } from "../../../app/utils";

const OrderItem = () => {
  return (
    <Box sx={{ display: "flex", mb: 3 }}>
      <Paper>
        <CardMedia
          sx={{
            width: { xs: 125, md: 90 },
            height: { xs: 125, md: 90 },
            backgroundColor: (t) => t.palette.primary.main,
          }}
          image={"/images/sample/product.png"}
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
            Product name
          </Typography>
          <Typography variant="caption">category</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography>Qty: 1</Typography>
          <Typography>Price: {PHPPrice.format(1000)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const OrderItems = () => {
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
          <StatusInfo status={"To Process"} />
        </Box>
        <Button
          variant="outlined"
          // onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </Box>
      <Divider />
      <Box sx={{ p: "10px 20px" }}>
        <OrderItem />
        <OrderItem />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography textAlign="end">
          Total(12 items): {PHPPrice.format(1000)}
        </Typography>
      </Box>
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
        <OrderItems />
        <OrderItems />
      </Stack>
    </Box>
  );
}

export default Orders;
