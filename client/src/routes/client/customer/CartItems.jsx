import { useSelector } from "react-redux";
import { userSelector } from "../../../features/userSlice";
import { PHPPrice, api_base_url } from "../../../app/utils";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

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

import {
  useGetCartByUserQuery,
  useRemoveToCartMutation,
  useUpdateCartMutation,
} from "../../../app/services/cart-item";
import { useCreateCheckoutMutation } from "../../../app/services/checkout";

const CartItem = ({ i, id, product, quantity }) => {
  const [updateCart] = useUpdateCartMutation();
  const [removeToCart] = useRemoveToCartMutation();

  const increaseQuantity = async () => {
    if (quantity + 1 <= product.stocks) {
      let data = { id, data: { quantity: quantity + 1 } };
      await updateCart(data).unwrap();
    } else {
      enqueueSnackbar("Stock maxed out...", { preventDuplicate: true });
    }
  };
  const decreaseQuantity = async () => {
    if (quantity - 1 !== 0) {
      let data = { id, data: { quantity: quantity - 1 } };
      await updateCart(data).unwrap();
    }
  };
  const deleteCart = async () => {
    await removeToCart(id).then((res) => {
      enqueueSnackbar("Cart Item Deleted", { variant: "success" });
    });
  };
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
          {i}
        </Typography>

        <Paper>
          <CardMedia
            image={`${api_base_url}${product.img_url}`}
            sx={{
              width: { xs: 150, md: 100 },
              height: { xs: 150, md: 100 },
              backgroundColor: (t) => t.palette.primary.main,
            }}
          />
        </Paper>

        <Box ml={2}>
          <Typography
            variant="h6"
            fontWeight="bold"
            width={{ xs: 175, md: "100%" }}
            component={Link}
            to={`/products/${product.id}`}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {product.name}
          </Typography>
          <Typography>{product.category}</Typography>
          <Typography>Price: {PHPPrice.format(product.price)}</Typography>
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
          <Button onClick={decreaseQuantity}>
            <RemoveIcon />
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: 2,
            }}
          >
            {quantity}
          </Box>
          <Button onClick={increaseQuantity}>
            <AddIcon />
          </Button>
          <Button color="error" onClick={deleteCart}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

function CartItems() {
  const navigate = useNavigate();

  const user = useSelector(userSelector);
  const { data: cart_items = [] } = useGetCartByUserQuery(user.id);

  const [createCheckout] = useCreateCheckoutMutation();

  const checkOutClicked = async () => {
    if (cart_items.length > 0) {
      const data = { customer: user.id };
      data.checkout_items = cart_items.map((item) => {
        return {
          ...item,
          name: item.product.name,
          img_name: item.product.img_name,
          price: item.product.price,
        };
      });
      data.total_quantity = cart_items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      data.total_price = cart_items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

      await createCheckout(data)
        .then((res) => {
          console.log("Create Order successfully", res);
          enqueueSnackbar("Create Order successfully", {
            variant: "success",
          });
          navigate("/customer/orders");
        })
        .catch((err) => console.log(err));
    } else {
      enqueueSnackbar("Your cart is currently empty...");
    }
  };

  return (
    <Box mt={20}>
      <Typography variant="h3" textAlign="center" mb={3}>
        YOUR CART ITEMS
      </Typography>
      <Stack spacing={2}>
        {cart_items.map((cart, i) => (
          <CartItem key={cart.id} i={i + 1} {...cart} />
        ))}
      </Stack>
      <Box mt={3}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          TOTAL
        </Typography>
        <Stack alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography variant="h5" textAlign="right" width={160}>
              Total Price:
            </Typography>
            <Typography width={140} fontSize={23}>
              {PHPPrice.format(
                cart_items.reduce(
                  (total, item) =>
                    total + item.product.price * item.quantity,
                  0
                )
              )}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography variant="h5" textAlign="right" width={160}>
              Total Quantity:
            </Typography>
            <Typography width={140} fontSize={23}>
              {cart_items.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ display: "flex", mt: 3 }}>
          <Button
            variant="contained"
            sx={{ margin: "auto" }}
            onClick={checkOutClicked}
          >
            Checkout Items
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItems;
