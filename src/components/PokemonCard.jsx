import { Card, CardContent, CardMedia, CardActions, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

export default function PokemonCard({ pokemon, onDelete }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    pokemon.image = `${mediaUrl}/${pokemon.picture}`;

    const handleDelete = () => {
        if (window.confirm(`¿Seguro que quieres eliminar a ${pokemon.name}?`)) {
            onDelete(pokemon.id);
        }
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={pokemon.image}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Type: {pokemon.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/pokemon/${pokemon.id}`}>
                    Ver
                </Button>
                {isLoggedIn() && (
                    <>
                        <Button size="small" component={Link} to={`/edit/${pokemon.id}`}>
                            Editar
                        </Button>
                        <Button size="small" color="error" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
