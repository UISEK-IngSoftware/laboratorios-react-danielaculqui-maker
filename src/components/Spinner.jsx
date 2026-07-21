import { Box, CircularProgress } from '@mui/material'; 
import './Spinner.css';

export default function Spinner() {
  return (
    <Box className="spinner-container">
      <CircularProgress size={60} />
    </Box>
  );
}