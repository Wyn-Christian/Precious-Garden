import { Box, Divider, Typography } from "@mui/material";

const DetailInfo = ({ title, value }) => (
  <Box>
    <Box m={1}>
      <Typography>{value}</Typography>
      <Typography variant="body2" color="gray">
        {title}
      </Typography>
    </Box>
    <Divider />
  </Box>
);

export default DetailInfo;
