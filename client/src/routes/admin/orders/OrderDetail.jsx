import { useParams } from "react-router-dom";

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
import { PHPPrice } from "../../../app/utils";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CategoryInfo from "../../../components/CategoryInfo";

const StatusOrder = ({ status }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const handleChange = (e) => setCurrentStatus(e.target.value);
  const { id } = useParams();
  // const [changeStatusOrder] = useChangeStatusOrderMutation();

  // const handleSaveClick = async () => {
  //   await changeStatusOrder({ id, data: { status: currentStatus } }).then(
  //     (res) => {
  //       console.log("Status Changed successfully", res);
  //     }
  //   );
  // };
  // useEffect(() => {
  //   if (status === "delivered" || status === "cancelled") {
  //     setIsDisabled(true);
  //   }
  // }, [status]);

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
          // onClick={handleSaveClick}
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
        image={`/images/sample/product.png`}
        sx={{ height: 60, width: 60 }}
      />
    </Paper>
  );
};

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
    width: 200,
    valueFormatter: (product) => product.value.name,
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
    renderCell: (params) => <CategoryInfo {...params} />,
  },
];

function OrderDetail() {
  const { id } = useParams();
  return (
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
            <DetailInfo title="Full Name" value="Sample Name" />
            <DetailInfo title="Username" value="Sample Username" />
            <DetailInfo title="Email" value="Sample@email.com" />
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper elevation={3}>
            <DetailTitle title="Contact Info" />
            <DetailInfo title="Phone Number" value="091234553" />
            <DetailInfo
              title="Address"
              value="Sample user address sheeeesh"
            />
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper elevation={3}>
            <DetailTitle title="Order Info" />
            <DetailInfo title="Date of order" value="Sat, May 27, 2023" />
            <DetailInfo
              title="Total Price"
              value={PHPPrice.format(1000)}
            />
            <DetailInfo title="Total Quantity" value={12} />
          </Paper>
        </Grid>
        <Grid xs={12}>
          <StatusOrder status="To Process" />
        </Grid>
        <Grid xs={12}>
          <DataGrid
            rowHeight={100}
            rows={[
              {
                id: 1,
                product: "hello",
                price: 100,
                quantity: 1,
                category: "plant",
              },
            ]}
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

export default OrderDetail;
