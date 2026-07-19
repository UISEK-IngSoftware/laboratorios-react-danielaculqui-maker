import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress, Alert } from "@mui/material";
import { fetchPokemonById } from "../services/pokemonService";
import { isLoggedIn } from "../services/authService";

const TRAINER_NAMES = { "1": "Ash", "2": "Misty", "3": "Brock" };
const TYPE_NAMES = { A: "Agua", F: "Fuego", T: "Tierra", P: "Planta", E: "Eléctrico", L: "Lagartija" };

export default function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchPokemonById(id).then((data) => {
            setPokemon(data);
        }).catch((error) => {
            console.error("Error obteniendo el pokemon:", error);
            setErrorMsg("No se pudo cargar el pokemon.");
        });
    }, [id]);

    if (errorMsg) {
        return <Alert severity="error">{errorMsg}</Alert>;
    }

    if (!pokemon) {
        return <CircularProgress />;
    }

    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    const image = `${mediaUrl}/${pokemon.picture}`;

    return (
        <Card sx={{ maxWidth: 500, margin: "0 auto" }}>
            <CardMedia
                component="img"
                height="350"
                image={image}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h4" gutterBottom>{pokemon.name}</Typography>
                <Typography variant="body1">Tipo: {TYPE_NAMES[pokemon.type] || pokemon.type}</Typography>
                <Typography variant="body1">Peso: {pokemon.weight}</Typography>
                <Typography variant="body1">Altura: {pokemon.height}</Typography>
                <Typography variant="body1">Entrenador: {TRAINER_NAMES[pokemon.trainer] || pokemon.trainer}</Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={() => navigate("/")}>
                        Volver
                    </Button>
                    {isLoggedIn() && (
                        <Button variant="contained" component={Link} to={`/edit/${pokemon.id}`}>
                            Editar
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
