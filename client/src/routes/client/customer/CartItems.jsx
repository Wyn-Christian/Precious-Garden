import { PHPPrice } from "../../../app/utils";
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { md: "space-between" },
        alignItems: { xs: "center" },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h4"
          alignSelf="center"
          sx={{ mx: { xs: 1, md: 5 } }}
        >
          1
        </Typography>

        <Paper>
          <CardMedia
            image="/images/sample/product.png"
            sx={{
              width: { xs: 150, md: 100 },
              height: { xs: 150, md: 100 },
              backgroundColor: (t) => t.palette.primary.main,
            }}
          />
        </Paper>

        <Box ml={2}>
          <Typography variant="h6" fontWeight="bold">
            Description
          </Typography>
          <Typography>Plant</Typography>
          <Typography>Price: {PHPPrice.format(100)}</Typography>
        </Box>
      </Box>
      <Stack
        spacing={1.3}
        direction={{ xs: "row", md: "column" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        mt={{ xs: 1.2, md: 0 }}
      >
        <Typography fontWeight="bold">Quantity:</Typography>
        <ButtonGroup variant="contained" disableElevation>
          <Button>
            <AddIcon />
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: 2,
            }}
          >
            1
          </Box>
          <Button>
            <RemoveIcon />
          </Button>
          <Button color="error">
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

function CartItems() {
  return (
    <Box mt={20}>
      <Typography variant="h3" textAlign="center" mb={3}>
        YOUR CART ITEMS
      </Typography>
      <Stack spacing={2}>
        <CartItem />
        <CartItem />
        <CartItem />
      </Stack>
      <Box mt={3}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          TOTAL
        </Typography>
        <Stack alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography variant="h5" textAlign="right" width={150}>
              Total Price:
            </Typography>
            <Typography width={140} fontSize={23}>
              {PHPPrice.format(1000)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography variant="h5" textAlign="right" width={150}>
              Total Quantity:
            </Typography>
            <Typography width={140} fontSize={23}>
              13
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ display: "flex", mt: 3 }}>
          <Button variant="contained" sx={{ margin: "auto" }}>
            Checkout Items
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItems;
