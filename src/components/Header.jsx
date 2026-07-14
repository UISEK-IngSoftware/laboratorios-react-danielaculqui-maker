import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
    const pokedexLogo = "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg";

    return (
        <Container>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-container">
                            <img src={pokedexLogo} alt="Logo" height={60} style={{ padding: '10px 0' }} />
                        </div>
                    </Toolbar>
                    <Toolbar>
            <Button color="inherit" href="/">Inicio</Button>
            <Button color="inherit" href="/add">Agregar Pokémon</Button>
            <Button color="inherit" href="/login">Iniciar sesión</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    );
}
