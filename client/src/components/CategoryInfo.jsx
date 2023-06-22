import { Box, Chip } from "@mui/material";

const CategoryInfo = ({ row }) => {
  let content;

  switch (row.category) {
    case "Plant":
      content = <Chip sx={{ backgroundColor: "#C7E9B0" }} label="Plant" />;
      break;
    case "Pot":
      content = <Chip sx={{ backgroundColor: "#BAD1C2" }} label="Pot" />;
      break;
    case "Soil":
      content = <Chip sx={{ backgroundColor: "#FFD495" }} label="Soil" />;
      break;
    case "Tool":
      content = <Chip sx={{ backgroundColor: "#EAE0DA" }} label="Tool" />;
      break;
  }
  return <Box m="auto">{content}</Box>;
};

export default CategoryInfo;
