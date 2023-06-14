import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminTitle from "../../../components/AdminTitle";
import { PHPPrice, generateProductData } from "../../../app/utils";
import ViewAction from "../../../components/ViewAction";
import CategoryInfo from "../../../components/CategoryInfo";

const ImageColumn = ({ row }) => {
  return (
    <Paper sx={{ m: "auto" }}>
      <CardMedia
        // image={`${api_base_url}${row.image_url}`}
        image={`${row.img_url}`}
        sx={{
          height: 70,
          width: 70,
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      />
    </Paper>
  );
};

const productSampleData = Array.from(Array(10), (val, index) =>
  generateProductData(index + 1)
);

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    headerAlign: "center",
    renderCell: (params) => <ImageColumn {...params} />,
  },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    valueFormatter: (price) => PHPPrice.format(price.value),
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <CategoryInfo {...params} />,
  },
  { field: "stocks", headerName: "Stocks", type: "number", width: 100 },
  {
    field: "num_sold",
    headerName: "No. of Sold",
    type: "number",
    width: 120,
  },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <ViewAction to="products" params={params} />,
  },
];

function ProductsList() {
  return (
    <Box>
      <AdminTitle title="List of Products" />
      <DataGrid
        rowHeight={100}
        rows={productSampleData}
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

export default ProductsList;
