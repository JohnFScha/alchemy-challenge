import './App.css';
import Login from './Components/Login/Login';
import Listado from './Components/Listado/Listado'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/listado" element={<Listado />}/>
      <Route path="/listado/:movieId" element={<MovieDetail />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
