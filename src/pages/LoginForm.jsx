import { useState } from "react";
import "./LoginForm.css";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";


export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <Box component="form" className="login-form" onSubmit={handleLogin}>
      <Typography variant="h5" gutterBottom>
        Inicio de sesión
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <TextField
        label="Usuario"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <TextField
        label="Contraseña"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
}