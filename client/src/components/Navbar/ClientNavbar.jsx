import { useDispatch, useSelector } from "react-redux";
import { removeUser, userSelector } from "../../features/userSlice";
import { Link } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useEffect, useState } from "react";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Footer from "../Footer";
import { useGetCartByUserQuery } from "../../app/services/cart-item";
import { api_base_url } from "../../app/utils";
import { enqueueSnackbar } from "notistack";

const CartItemsButton = () => {
  const [totalItems, setTotalItems] = useState(0);
  const user = useSelector(userSelector);
  const { data: cart_items = [] } = useGetCartByUserQuery(user.id);

  useEffect(() => {
    let total_num = cart_items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItems(total_num);
  }, [cart_items]);

  return (
    <IconButton
      size="large"
      color="inherit"
      LinkComponent={Link}
      to="/customer/cart-items"
    >
      <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

const NavItemLink = ({ to, title }) => (
  <Box
    component={Link}
    to={to}
    sx={{ textDecoration: "none", color: "inherit" }}
  >
    <Button sx={{ my: 2, color: "black", display: "block" }} disableRipple>
      {title}
    </Button>
  </Box>
);

const MenuNavItemLink = ({ to, title, handleCloseNavMenu }) => (
  <Box
    component={Link}
    to={to}
    sx={{ textDecoration: "none", color: "inherit" }}
  >
    <MenuItem onClick={handleCloseNavMenu}>
      <Typography variant="button">{title}</Typography>
    </MenuItem>
  </Box>
);

const UserAvatarMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(removeUser());
    enqueueSnackbar("Log out Successfully", { variant: "success" });
    setAnchorElUser(null);
  };

  return (
    <Box>
      <CartItemsButton />
      <Tooltip title="Open Settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
          <Avatar alt={user.name} src={`${api_base_url}${user.img_url}`} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuNavItemLink to="/customer" title="profile" />
        <MenuNavItemLink to="/customer/wishlist" title="my wishlist" />
        <MenuNavItemLink to="/customer/orders" title="orders" />
        <Divider />
        <Box
          component={Link}
          to="/login"
          onClick={handleLogout}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>
            <Typography variant="button">Log-out</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

function ClientNavbar({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const user = useSelector(userSelector);

  return (
    <Box>
      <AppBar
        elevation={trigger ? 4 : 0}
        color={trigger ? "primary" : "default"}
      >
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuNavItemLink
                  to="/"
                  title="home"
                  handleCloseNavMenu={handleCloseNavMenu}
                />
                <MenuNavItemLink
                  to="/about-us"
                  title="About Us"
                  handleCloseNavMenu={handleCloseNavMenu}
                />
                <MenuNavItemLink
                  to="/products"
                  title="products"
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Menu>
            </Box>
            <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <Box
                component="img"
                src="/images/LOGO.png"
                sx={{ height: 100 }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavItemLink to="/" title="Home" />
              <NavItemLink to="/about-us" title="About Us" />
              <NavItemLink to="/products" title="Products" />
            </Box>
            {user.id ? (
              <UserAvatarMenu />
            ) : (
              <Box sx={{ display: "flex" }}>
                <NavItemLink to="/login" title="Log in" />
                <NavItemLink to="/sign-up" title="Sign Up" />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={13} minHeight="70vh" mb={6}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default ClientNavbar;
