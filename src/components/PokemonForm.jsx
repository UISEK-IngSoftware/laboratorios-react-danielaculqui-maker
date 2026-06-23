import { Box, Button, TextField, Typography } from '@mui/material'; //  Importado el componente Button
import './PokemonForm.css';

export default function PokemonForm() {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokémon
            </Typography>
            
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField 
                    label="Nombre" 
                    variant="outlined" 
                />
                
                <TextField 
                    label="Tipo" 
                    variant="outlined" 
                />
                
                <TextField 
                    label="Peso" 
                    variant="outlined" 
                    type="number" 
                />
                
                <TextField 
                    label="Altura" 
                    variant="outlined" 
                    type="number" 
                />
                
                <input 
                    type='file' 
                    name='picture' 
                    accept='image/*' 
                />
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type='submit'
                >
                    Guardar
                </Button>
            </Box>
        </>
    );
}