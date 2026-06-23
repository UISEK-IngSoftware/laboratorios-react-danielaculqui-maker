import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function PokemonCard({ pokemon }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    pokemon.image = `${mediaUrl}/${pokemon.picture}`;
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

    </Card>
  )
}