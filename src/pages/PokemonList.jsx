import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { fetchPokemons, deletePokemon } from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard";
import Spinner from "../components/Spinner";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPokemons = () => {
        setLoading(true);
        fetchPokemons().then((data) => {
            setPokemons(data);
        }).catch((error) => {
            setError("Error obteniendo pokemons. Por favor, inténtelo de nuevo más tarde.");
            console.error("Error obteniendo pokemons:", error);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    const handleDelete = (id) => {
        deletePokemon(id).then(() => {
            setPokemons((prev) => prev.filter((p) => p.id !== id));
        }).catch((error) => {
            alert("Error eliminando el pokemon. Por favor, inténtelo de nuevo más tarde.");
            console.error("Error eliminando pokemon:", error);
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemonItem) => (
                <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <PokemonCard pokemon={pokemonItem} onDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>
    );
}