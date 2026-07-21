<<<<<<< HEAD
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
=======
import { Box, CircularProgress } from '@mui/material'; 
import './Spinner.css';

export default function Spinner() {
  return (
    <Box className="spinner-container">
      <CircularProgress size={60} />
>>>>>>> 9375c9e4b4d3539125afc7d1817adb65cca86107
    </Box>
  );
}