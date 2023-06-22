import { Link } from "react-router-dom";
import {
  PHPPrice,
  api_base_url,
  generateOrderData,
} from "../../../app/utils";

import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AdminTitle from "../../../components/AdminTitle";
import ViewAction from "../../../components/ViewAction";
import StatusInfo from "../../../components/StatusInfo";
import { useGetCheckoutsQuery } from "../../../app/services/checkout";

const CustomerData = ({ row }) => (
  <Stack direction="row" spacing={1} m="auto">
    {/* <Avatar src={`${api_base_url}${row.user.image_url}`} /> */}
    <Avatar src={`${api_base_url}${row.customer.img_url}`} />
    <Typography alignSelf="center">{row.customer.username}</Typography>
  </Stack>
);

const orderSampleData = Array.from(Array(10), (val, index) =>
  generateOrderData(index + 1)
);

const columns = [
  {
    field: "user",
    headerName: "User",
    width: 200,
    headerAlign: "center",
    renderCell: (params) => <CustomerData {...params} />,
    // format: (user) => user,
    // valueFormatter: (user) => user.value.username,
  },
  {
    field: "total_price",
    headerName: "Total Price",
    type: "number",
    width: 110,
    valueFormatter: (price) => PHPPrice.format(price.value),
  },
  {
    field: "total_quantity",
    headerName: "Total Quantity",
    type: "number",
    width: 110,
    valueFormatter: (qty) =>
      `${qty.value} ${qty.value > 1 ? "items" : "item"}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    headerAlign: "center",
    renderCell: (params) => <StatusInfo {...params} />,
  },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <ViewAction to="orders" params={params} />,
  },
];

function OrdersList() {
  const { data: checkouts = [] } = useGetCheckoutsQuery();
  return (
    <Box>
      <AdminTitle title="List of Orders" />
      <DataGrid
        rowHeight={90}
        rows={checkouts}
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
    </Box>
  );
}

export default OrdersList;
