import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import ClientNavbar from "./ClientNavbar";
import { Box } from "@mui/material";

function Navbar({ children }) {
  let location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (location.pathname.match("admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  let content;
  if (isAdmin) {
    content = <AdminNavbar>{children}</AdminNavbar>;
  } else {
    content = <ClientNavbar>{children}</ClientNavbar>;
  }

  return <Box>{content}</Box>;
}

export default Navbar;
