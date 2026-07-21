import { useState, useEffect } from "react";
import {
  Grid, Box, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, CircularProgress, Typography
} from "@mui/material";
import { fetchPokemons, deletePokemon } from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadPokemons = () => {
        setLoading(true);
        fetchPokemons().then((data) => {
            setPokemons(data);
            setErrorMsg("");
            setLoading(false);
        }).catch((error) => {
            console.error("Error obteniendo pokemons:", error);
            setErrorMsg("No se pudo cargar la lista de pokemones. Intenta nuevamente más tarde.");
            setLoading(false);
        });
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    const handleDeleteConfirm = async () => {
        try {
            await deletePokemon(deleteTarget.id);
            setPokemons((prev) => prev.filter((p) => p.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (error) {
            console.error("Error eliminando pokemon:", error);
            setErrorMsg("❌ Error al eliminar el pokemon.");
            setDeleteTarget(null);
        }
    };

    return (
        <Box>
            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

            {loading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                    <CircularProgress size={50} />
                    <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                        Cargando Pokemones...
                    </Typography>
                </Box>
            ) : pokemons.length === 0 && !errorMsg ? (
                <Alert severity="info">No hay pokemones registrados todavía.</Alert>
            ) : (
                <Grid container spacing={2}>
                    {pokemons.map((pokemonItem) => (
                        <Grid key={pokemonItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <PokemonCard
                                pokemon={pokemonItem}
                                onDelete={() => setDeleteTarget(pokemonItem)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
                <DialogTitle>¿Eliminar pokemon?</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que quieres eliminar a {deleteTarget?.name}? Esta acción no se puede deshacer.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteTarget(null)}>Cancelar</Button>
                    <Button color="error" onClick={handleDeleteConfirm}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
