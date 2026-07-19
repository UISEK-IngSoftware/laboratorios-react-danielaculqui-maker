import { Container } from '@mui/material';
import './App.css';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import LoginForm from './pages/LoginForm';
import PokemonForm from './components/PokemonForm';
import PokemonDetail from './pages/PokemonDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Container sx={{ marginTop: 2 }}>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/add" element={<PokemonForm />} />
                    <Route path="/edit/:id" element={<PokemonForm />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
