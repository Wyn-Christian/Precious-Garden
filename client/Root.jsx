import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Navbar from "./src/components/Navbar/Index";

function Root() {
  return (
    <Box>
      <CssBaseline />
      <Navbar>
        <Outlet />
      </Navbar>
    </Box>
  );
}

export default Root;
