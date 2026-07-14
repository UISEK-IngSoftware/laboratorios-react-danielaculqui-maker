import { Container, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pokedexLogo from "../assets/pokemon-23.svg";
import "./Header.css";
import { logout as authLogout } from "../services/authService";

export default function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("access_token")));

  useEffect(() => {
    const handler = () => setIsLoggedIn(Boolean(localStorage.getItem("access_token")));
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await authLogout();
    } catch {
      // ignore errors on logout
    }
    navigate("/login");
  };

  return (
    <Container>
      <div className="pokedex-navbar">
        <AppBar position="static" color="primary" elevation={4}>
          <Toolbar
            sx={{
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 2 }}>
              <img
                src={pokedexLogo}
                alt="Pokedex Logo"
                className="pokedex-logo"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </Box>

            {/* Botones */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Inicio
              </Button>
              {isLoggedIn && (
                <Button color="inherit" component={Link} to="/add">
                  Agregar Pokémon
                </Button>
              )}
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  Iniciar Sesión
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </Container>
  );
}