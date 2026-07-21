import { Box, Button, TextField, Typography, Alert, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Spinner from '../components/Spinner';

export default function LoginForm() {
  const navigate = useNavigate();
  const theme = useTheme(); 

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await login(credentials.username, credentials.password);
      localStorage.setItem('access_token', data.access_token);
      window.dispatchEvent(new Event('authChanged'));
      navigate("/");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMsg('Usuario o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000000 100%)`
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        pt: 8,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          backgroundColor: "background.paper", 
          border: `1px solid ${theme.palette.divider}`, 
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "text.primary" }}>
          Iniciar Sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <TextField
            label="Usuario"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              height: 45,
            }}
          >
            {loading ? <Spinner message="Validando..." /> : "Entrar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
