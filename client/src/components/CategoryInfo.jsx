import { Box, Chip } from "@mui/material";

const CategoryInfo = ({ row }) => {
  let content;
  switch (row.category) {
    case "plant":
      content = <Chip sx={{ backgroundColor: "#C7E9B0" }} label="Plant" />;
      break;
    case "pot":
      content = <Chip sx={{ backgroundColor: "#BAD1C2" }} label="Pot" />;
      break;
    case "soil":
      content = <Chip sx={{ backgroundColor: "#FFD495" }} label="Soil" />;
      break;
    case "tool":
      content = <Chip sx={{ backgroundColor: "#EAE0DA" }} label="Tool" />;
      break;
  }
  return <Box m="auto">{content}</Box>;
};

export default CategoryInfo;
