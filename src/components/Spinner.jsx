import { Box, CircularProgress, Typography } from "@mui/material";

export default function Spinner({ message = "Cargando..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        py: 2,
      }}
    >
      <CircularProgress size={28} />
      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
        {message}
      </Typography>
    </Box>
  );
}