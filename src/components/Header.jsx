import { AppBar, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/pokemon-23.svg"
import './Header.css'

export default function Header (){
    return (
        <Container>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-container">
                            <img src={pokedexLogo} alt="pokemon-23" height={150} />
                        </div> 
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    )
}