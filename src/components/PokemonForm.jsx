import { Box, Button, TextField, Typography, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPokemon } from '../services/pokemonService'
import './PokemonForm.css'

export default function PokemonForm() {

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        trainer: "",
        picture: null,
    });

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
        addPokemon(pokemonData).then(() => {
            alert('Pokemon agregado exitosamente');
            navigate("/");
        }).catch((error) => {
            console.error('Error al agregar el pokemon:', error);
            setErrorMsg('Error al agregar el pokemon. Por favor, inténtelo de nuevo más tarde.');
        });
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokemon
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

                <input type="file" name="picture" accept="image/*" onChange={handleChange} />

                <Button variant="contained" color="primary" type="submit">
                    Guardar
                </Button>
            </Box>
        </>
    );
}