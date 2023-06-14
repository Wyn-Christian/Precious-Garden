import { Link, useNavigate, useParams } from "react-router-dom";
import { PHPPrice } from "../../../app/utils";

// MUI Components
import {
  Box,
  Button,
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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
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

function ProductDetail() {
  const { id } = useParams();

  return (
    <Box sx={{ mb: 10 }}>
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
          <Button
            variant="contained"
            color="error"
            // onClick={handleOpen}
          >
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
              image={`/images/sample/product.png`}
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
            <DetailInfo title="Name" value="sample name" />
            <DetailInfo
              title="Description"
              value="sample product description"
            />
            <DetailInfo title="Category" value="Plant" />
            <DetailInfo title="Price" value={PHPPrice.format(1212)} />
            <DetailInfo title="Stocks" value={12} />
            <DetailInfo title="No. of Sold" value={21} />
          </Paper>
          <Paper>
            <DetailTitle title="PLANT INFO" />
            <DetailInfo title="Type" value="Indoor" />
            <DetailInfo title="height" value={12} />
            <DetailInfo title="Pot Diameter" value={12} />
          </Paper>
          <Paper>
            <DetailTitle title="PLANT SPECS" />

            <RatingInfo
              title="Light Requirements"
              value={3}
              Icon={LightModeIcon}
              EmptyIcon={LightModeOutlinedIcon}
            />
            <RatingInfo
              title="Humidity Needs"
              value={3}
              Icon={LocalDrinkIcon}
              EmptyIcon={LocalDrinkOutlinedIcon}
            />
            <RatingInfo
              title="Watering Needs"
              value={3}
              Icon={WaterDropIcon}
              EmptyIcon={WaterDropOutlinedIcon}
            />
            <RatingInfo
              title="Repotting"
              value={3}
              Icon={YardIcon}
              EmptyIcon={YardOutlinedIcon}
            />
            <RatingInfo
              title="Pet Friendly"
              value={3}
              Icon={PetsIcon}
              EmptyIcon={PetsOutlinedIcon}
            />
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}

export default ProductDetail;
