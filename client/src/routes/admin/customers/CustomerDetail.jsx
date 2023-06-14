import { useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AdminTitle from "../../../components/AdminTitle";
import DetailTitle from "../../../components/DetailTitle";
import DetailInfo from "../../../components/DetailInfo";

function CustomerDetail() {
  const { id } = useParams();
  return (
    <Box>
      <AdminTitle title="Customer Detail" />
      <Box>
        <Typography variant="overline">CUSTOMER ID:</Typography>
        <Chip label={id} />
      </Box>
      <Stack
        direction={{ xs: "column", md: "row-reverse" }}
        justifyContent={{ md: "space-evenly" }}
        spacing={3}
        mt={3}
        height={500}
      >
        <Box>
          <Avatar
            src={`/images/sample/customer.jpg`}
            sx={{
              width: { xs: 300, sm: 200, md: 250 },
              height: { xs: 300, sm: 200, md: 250 },
              position: { md: "sticky" },
              top: { md: 85 },
              m: { xs: "auto", md: 0 },
            }}
          />
        </Box>
        <Stack direction="column" spacing={2} sx={{ width: { md: 600 } }}>
          <Paper>
            <DetailTitle title="Account Info" />
            <DetailInfo title="Full Name" value="Sample Name" />{" "}
            <DetailInfo title="Username" value="Sample User Name" />{" "}
            <DetailInfo title="Email" value="Sample@email.com" />{" "}
          </Paper>
          <Paper>
            <DetailTitle title="Contact Info" />
            <DetailInfo title="Phone number" value="092109219" />{" "}
            <DetailInfo
              title="Address"
              value="Sample User Addresss omgahd"
            />
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CustomerDetail;
