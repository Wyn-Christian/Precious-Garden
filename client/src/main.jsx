import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import theme from "./app/theme.jsx";
import store from "./app/store.js";

import { ThemeProvider } from "@mui/material/styles";
import Root from "./routes/Root.jsx";
import Error from "./routes/Error.jsx";

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
            element: <h1>Home Page</h1>,
          },
          {
            path: "/about-us",
            element: <h1>About Us Page</h1>,
          },
          {
            path: "/about-us",
            element: <h1>About Us Page</h1>,
          },
          {
            path: "/products",
            element: <h1>List of Products Page</h1>,
          },
          {
            path: "/products/:id",
            element: <h1>Product Detail Page</h1>,
          },
          {
            path: "/products/:id",
            element: <h1>Product Detail Page</h1>,
          },
          {
            path: "/login",
            element: <h1>Login Form</h1>,
          },
          {
            path: "/sign-up",
            element: <h1>Sign Up Form</h1>,
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
                element: <h1>Customer&apos;s Wish List</h1>,
              },
              {
                path: "cart-items",
                element: <h1>Customer&apos;s Cart Items</h1>,
              },
              {
                path: "orders",
                element: <h1>Customer&apos;s Orders</h1>,
              },
            ],
          },
          {
            path: "/admin",
            children: [
              {
                index: true,
                element: <h1>Admin root sheesh</h1>,
              },
              {
                path: "customers",
                children: [
                  {
                    path: "list",
                    element: <h1>Customers List</h1>,
                  },
                  {
                    path: ":id",
                    element: <h1>Customers Detail</h1>,
                  },
                  {
                    path: ":id/update",
                    element: <h1>Customers Update</h1>,
                  },
                  {
                    path: "create",
                    element: <h1>Customers Create</h1>,
                  },
                ],
              },
              {
                path: "categories",
                children: [
                  {
                    path: "list",
                    element: <h1>Categories List</h1>,
                  },
                  {
                    path: ":id",
                    element: <h1>Categories Detail</h1>,
                  },
                  {
                    path: ":id/update",
                    element: <h1>Categories Update</h1>,
                  },
                  {
                    path: "create",
                    element: <h1>Categories Create</h1>,
                  },
                ],
              },
              {
                path: "products",
                children: [
                  {
                    path: "list",
                    element: <h1>Product List</h1>,
                  },
                  {
                    path: ":id",
                    element: <h1>Product Detail</h1>,
                  },
                  {
                    path: ":id/update",
                    element: <h1>Product Update</h1>,
                  },
                  {
                    path: "create",
                    element: <h1>Product Create</h1>,
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {
                    index: true,
                    element: <h1>Orders List</h1>,
                  },
                  {
                    path: ":id",
                    element: <h1>Orders Detail</h1>,
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
