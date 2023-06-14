import { useState } from "react";
import { Link } from "react-router-dom";
import { drawerWidth } from "../../app/utils";
import {
  AppBar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import ViewListIcon from "@mui/icons-material/ViewList";
import CreateIcon from "@mui/icons-material/Create";
import GrassIcon from "@mui/icons-material/Grass";

const NestedNavLinks = ({ text, items, Icon, handleDrawerToggle }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Icon color="primary" />
          </ListItemIcon>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          {items.map((item) => (
            <ListItemButton
              key={item}
              sx={{ pl: 3.5 }}
              LinkComponent={Link}
              to={`/admin/${text.toLowerCase()}/${item.title.toLowerCase()}`}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <item.icon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

const AdminDrawer = ({ handleDrawerToggle }) => {
  return (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent={Link}
              to={`/admin`}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <NestedNavLinks
            text="Customers"
            items={[{ title: "List", icon: ViewListIcon }]}
            Icon={PermIdentityIcon}
            handleDrawerToggle={handleDrawerToggle}
          />
          <NestedNavLinks
            text="Products"
            items={[
              { title: "List", icon: ViewListIcon },
              { title: "Create", icon: CreateIcon },
            ]}
            Icon={GrassIcon}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent={Link}
              to={`/admin/orders`}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <InboxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

function AdminNavbar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" src="/images/LOGO.png" sx={{ width: 60 }} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        <AdminDrawer />
      </Drawer>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-size",
            width: drawerWidth,
          },
        }}
      >
        <AdminDrawer handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingX: 3,
          pt: 2,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default AdminNavbar;
