import { 
  Box, Button, TextField, Typography, Alert, 
  Select, MenuItem, FormControl, InputLabel 
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addPokemon, updatePokemon, fetchPokemonById } from '../services/pokemonService'
import './PokemonForm.css'

export default function PokemonForm() {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(isEditMode);
    const [currentImage, setCurrentImage] = useState(null);
    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        trainer: "",
        picture: null,
    });

    useEffect(() => {
        if (!isEditMode) return;

        fetchPokemonById(id).then((data) => {
            setPokemonData({
                name: data.name || "",
                type: data.type || "",
                weight: data.weight || "",
                height: data.height || "",
                defense: data.defense || "",
                trainer: data.trainer ? String(data.trainer) : "",
                picture: null,
            });
            const mediaUrl = import.meta.env.VITE_MEDIA_URL;
            setCurrentImage(data.picture ? `${mediaUrl}/${data.picture}` : null);
        }).catch((error) => {
            console.error("Error obteniendo el pokemon:", error);
            setErrorMsg("No se pudo cargar el pokemon a editar.");
        }).finally(() => setLoading(false));
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setPokemonData({ ...pokemonData, picture: files[0] });
        } else {
            setPokemonData({ ...pokemonData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsSuccess(false);

        try {
            if (isEditMode) {
                await updatePokemon(id, pokemonData);
            } else {
                await addPokemon(pokemonData);
            }
            setIsSuccess(true);
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error('Error al guardar el pokemon:', error);
            setErrorMsg(error.message || 'Error al guardar el pokemon. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {isEditMode ? 'Editar Pokémon' : 'Formulario de Pokemon'}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {errorMsg && (
                    <Alert severity="error">{errorMsg}</Alert>
                )}
                {isSuccess && (
                    <Alert severity="success">
                        {isEditMode ? 'Pokémon actualizado exitosamente' : 'Pokémon agregado exitosamente'}
                    </Alert>
                )}

                <TextField
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="type-label">Tipo</InputLabel>
                    <Select
                        labelId="type-label"
                        label="Tipo"
                        name="type"
                        value={pokemonData.type}
                        onChange={handleChange}
                    >
                       <MenuItem value="">----------</MenuItem>
                        <MenuItem value="A">Agua</MenuItem>
                        <MenuItem value="F">Fuego</MenuItem>
                        <MenuItem value="T">Tierra</MenuItem>
                        <MenuItem value="P">Planta</MenuItem>
                        <MenuItem value="E">Eléctrico</MenuItem>
                        <MenuItem value="L">Lagartija</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Peso"
                    variant="outlined"
                    type="number"
                    name="weight"
                    value={pokemonData.weight}
                    onChange={handleChange}
                />
                <TextField
                    label="Altura"
                    variant="outlined"
                    type="number"
                    name="height"
                    value={pokemonData.height}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="trainer-label">Entrenador</InputLabel>
                    <Select
                        labelId="trainer-label"
                        label="Entrenador"
                        name="trainer"
                        value={pokemonData.trainer}
                        onChange={handleChange}
                    >
                        <MenuItem value="">----------</MenuItem>
                        <MenuItem value="1">Ash</MenuItem>
                        <MenuItem value="2">Misty</MenuItem>
                        <MenuItem value="3">Brock</MenuItem>
                    </Select>
                </FormControl>

                {isEditMode && currentImage && !pokemonData.picture && (
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>Imagen actual:</Typography>
                        <img src={currentImage} alt={pokemonData.name} style={{ maxHeight: 150 }} />
                    </Box>
                )}

                <input type="file" name="picture" accept="image/*" onChange={handleChange} />

                <Button variant="contained" color="primary" type="submit">
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </Button>
            </Box>
        </>
    );
}
