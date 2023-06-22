import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../app/services/user";

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
import LoadingProgress from "../../../components/LoadingProgress";
import { api_base_url } from "../../../app/utils";

function CustomerDetail() {
  const { id } = useParams();
  const {
    data: customer = {},
    isLoading,
    isSuccess,
  } = useGetUserQuery(id);
  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
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
              src={`${api_base_url}${customer.img_url}`}
              sx={{
                width: { xs: 300, sm: 200, md: 250 },
                height: { xs: 300, sm: 200, md: 250 },
                position: { md: "sticky" },
                top: { md: 85 },
                m: { xs: "auto", md: 0 },
              }}
            />
          </Box>
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: { md: 600 } }}
          >
            <Paper>
              <DetailTitle title="Account Info" />
              <DetailInfo title="Full Name" value={customer.name} />
              <DetailInfo title="Username" value={customer.username} />
              <DetailInfo title="Email" value={customer.email} />
            </Paper>
            <Paper>
              <DetailTitle title="Contact Info" />
              <DetailInfo title="Phone number" value={customer.phone} />
              <DetailInfo title="Address" value={customer.address} />
            </Paper>
          </Stack>
        </Stack>
      </Box>
    );
  }
  return <Box>{content}</Box>;
}

export default CustomerDetail;
