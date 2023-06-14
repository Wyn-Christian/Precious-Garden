import { Box, Divider, Typography } from "@mui/material";

const DetailTitle = ({ title }) => (
  <Box>
    <Box m={1}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    <Divider />
  </Box>
);

export default DetailTitle;
