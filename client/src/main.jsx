import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import theme from "./app/theme.jsx";
import store from "./app/store.js";

import { ThemeProvider } from "@mui/material/styles";
import Root from "./routes/Root.jsx";
import Error from "./routes/Error.jsx";
import Dashboard from "./routes/admin/Dashboard.jsx";
import ProductsList from "./routes/admin/products/ProductsList.jsx";
import CustomersList from "./routes/admin/customers/CustomersList.jsx";
import OrdersList from "./routes/admin/orders/OrdersList.jsx";
import ProductCreate from "./routes/admin/products/ProductCreate.jsx";
import ProductDetail from "./routes/admin/products/ProductDetail.jsx";
import ProductUpdate from "./routes/admin/products/ProductEdit.jsx";
import CustomerDetail from "./routes/admin/customers/CustomerDetail.jsx";
import OrderDetail from "./routes/admin/orders/OrderDetail.jsx";
import Home from "./routes/client/Home.jsx";
import Products from "./routes/client/Products.jsx";
import ProductShowcase from "./routes/client/ProductShowcase.jsx";
import Login from "./routes/client/Login.jsx";
import Signup from "./routes/client/Signup.jsx";
import Orders from "./routes/client/customer/Orders.jsx";
import CartItems from "./routes/client/customer/CartItems.jsx";
import WishList from "./routes/client/customer/WishList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about-us",
            element: <h1>About Us Page</h1>,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:id",
            element: <ProductShowcase />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <Signup />,
          },
          {
            path: "/customer",
            children: [
              {
                index: true,
                element: <h1>Customer&apos;s Profile</h1>,
              },
              {
                path: "wishlist",
                element: <WishList />,
              },
              {
                path: "cart-items",
                element: <CartItems />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
            ],
          },
          {
            path: "/admin",
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "customers",
                children: [
                  {
                    path: "list",
                    element: <CustomersList />,
                  },
                  {
                    path: ":id",
                    element: <CustomerDetail />,
                  },
                ],
              },
              {
                path: "products",
                children: [
                  {
                    path: "list",
                    element: <ProductsList />,
                  },
                  {
                    path: ":id",
                    element: <ProductDetail />,
                  },
                  {
                    path: ":id/update",
                    element: <ProductUpdate />,
                  },
                  {
                    path: "create",
                    element: <ProductCreate />,
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {
                    index: true,
                    element: <OrdersList />,
                  },
                  {
                    path: ":id",
                    element: <OrderDetail />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
