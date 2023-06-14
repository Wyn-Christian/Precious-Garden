import { Box, Chip } from "@mui/material";

const StatusInfo = ({ row }) => {
  let content;
  switch (row.status) {
    case "to process":
      content = <Chip label="To Process" color="warning" />;
      break;
    case "on its way":
      content = <Chip label="On Its Way" color="info" />;
      break;
    case "delivered":
      content = <Chip label="Delivered" color="success" />;
      break;
    case "cancelled":
      content = <Chip label="Cancelled" color="error" />;
      break;
  }
  return <Box m="auto">{content}</Box>;
};

export default StatusInfo;
