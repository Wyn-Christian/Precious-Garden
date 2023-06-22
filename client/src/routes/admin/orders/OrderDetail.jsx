import { Link, useParams } from "react-router-dom";

import {
  Box,
  Button,
  CardMedia,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import AdminTitle from "../../../components/AdminTitle";
import DetailTitle from "../../../components/DetailTitle";
import DetailInfo from "../../../components/DetailInfo";
import { PHPPrice, api_base_url } from "../../../app/utils";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CategoryInfo from "../../../components/CategoryInfo";
import {
  useChangeStatusOrderMutation,
  useGetCheckoutQuery,
} from "../../../app/services/checkout";
import LoadingProgress from "../../../components/LoadingProgress";
import { enqueueSnackbar } from "notistack";

const StatusOrder = ({ status }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const handleChange = (e) => setCurrentStatus(e.target.value);
  const { id } = useParams();
  const [changeStatusOrder] = useChangeStatusOrderMutation();

  const handleSaveClick = async () => {
    await changeStatusOrder({ id, data: { status: currentStatus } }).then(
      (res) => {
        console.log("Status Changed successfully", res);
        enqueueSnackbar("Status Changed successfully", {
          variant: "success",
        });
      }
    );
  };

  useEffect(() => {
    if (status === "Delivered" || status === "Cancelled") {
      setIsDisabled(true);
    }
  }, [status]);

  return (
    <Paper elevation={3}>
      <DetailTitle title="Status" />
      <Box
        sx={{
          display: "flex",
          height: 100,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: { xs: "50%", md: "80%" } }}>
          <Select
            id="status"
            value={currentStatus}
            onChange={handleChange}
            readOnly={isDisabled}
          >
            <MenuItem value={"To Process"}>
              <Chip label="To Process" color="warning" />
            </MenuItem>
            <MenuItem value={"On Its Way"}>
              <Chip label="On Its Way" color="info" />
            </MenuItem>
            <MenuItem value={"Delivered"}>
              <Chip label="Delivered" color="success" />
            </MenuItem>
            <MenuItem value={"Cancelled"}>
              <Chip label="Cancelled" color="error" />
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

const ImageColumn = ({ row }) => {
  return (
    <Paper sx={{ m: "auto" }}>
      <CardMedia
        image={`${api_base_url}${row.img_url}`}
        sx={{
          height: 60,
          width: 60,
          backgroundColor: (t) => t.palette.primary.main,
        }}
      />
    </Paper>
  );
};

const ProductColumn = ({ product, name }) => (
  <Typography
    component={Link}
    to={`/admin/products/${product.id}`}
    sx={{ textDecoration: "none", color: "inherit" }}
    fontWeight="bold"
  >
    {name}
  </Typography>
);

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    headerAlign: "center",
    renderCell: (params) => <ImageColumn {...params} />,
  },
  {
    field: "product",
    headerName: "Product",
    width: 400,
    // valueFormatter: (product) => <h1>{product.value.name}</h1>,
    renderCell: (params) => <ProductColumn {...params.row} />,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    valueFormatter: (price) => PHPPrice.format(price.value),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    valueFormatter: (qty) =>
      `${qty.value} ${qty.value > 1 ? "items" : "item"}`,
  },
  {
    field: "category",
    headerName: "Category",
    width: 125,
    headerAlign: "center",
    renderCell: (params) => <CategoryInfo row={params.row.product} />,
  },
];

function OrderDetail() {
  const { id } = useParams();
  const {
    data: checkout = {},
    isLoading,
    isSuccess,
  } = useGetCheckoutQuery(id);

  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
      <Box>
        <AdminTitle title="Order Detail" />
        <Box>
          <Typography variant="overline">ORDER ID:</Typography>
          <Chip label={id} />
        </Box>

        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <DetailTitle title="Customer Info" />
              <DetailInfo
                title="Full Name"
                value={checkout.customer.name}
              />
              <DetailInfo
                title="Username"
                value={checkout.customer.username}
              />
              <DetailInfo title="Email" value={checkout.customer.email} />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <DetailTitle title="Contact Info" />
              <DetailInfo
                title="Phone Number"
                value={checkout.customer.phone}
              />
              <DetailInfo
                title="Address"
                value={checkout.customer.address}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <DetailTitle title="Order Info" />
              <DetailInfo
                title="Date of order"
                value={checkout.created_at}
              />
              <DetailInfo
                title="Total Price"
                value={PHPPrice.format(checkout.total_price)}
              />
              <DetailInfo
                title="Total Quantity"
                value={checkout.total_quantity}
              />
            </Paper>
          </Grid>
          <Grid xs={12}>
            <StatusOrder status={checkout.status} />
          </Grid>
          <Grid xs={12}>
            <DataGrid
              rowHeight={100}
              rows={checkout.checkout_items}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              sx={{
                boxShadow: 2,
                border: 1,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return <Box>{content}</Box>;
}

export default OrderDetail;
