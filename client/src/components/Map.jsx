import { Box } from "@mui/material";

function Map({ height = 1000 }) {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "right",
        width: "100%",
        height: `${height}px`,
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          background: "none",
          width: "100%",
          height: `${height}px`,
        }}
      >
        <iframe
          style={{ height: `${height}px` }}
          width="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=600&amp;height=1000&amp;hl=en&amp;q=Bagbaguin, caloocan city&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </Box>
    </Box>
  );
}

export default Map;
