import { Box, Chip } from "@mui/material";

const StatusInfo = ({ row }) => {
  let content;
  switch (row.status) {
    case "To Process":
      content = <Chip label="To Process" color="warning" />;
      break;
    case "On Its Way":
      content = <Chip label="On Its Way" color="info" />;
      break;
    case "Delivered":
      content = <Chip label="Delivered" color="success" />;
      break;
    case "Cancelled":
      content = <Chip label="Cancelled" color="error" />;
      break;
  }
  return <Box m="auto">{content}</Box>;
};

export default StatusInfo;
