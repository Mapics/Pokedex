import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import PokedexBrowser from './Components/PokedexBrowser.jsx';
import Personalpokedex from './Components/PersonalPokedex.jsx';

function App() {
  return (
    <div className="App">
      <header>
        <div id="site-header" className="headerpokedex">
          <div className="headercontainer">
            <img className="pokelogo" src="./pokelogo.png" alt="Pokelogo" />
            
            <Link className="pokedexbrowsertext" to="/PokedexBrowser">Pokedexbrowser</Link>
            <Link className="personalpokedextext" to="/PersonalPokedex">Personalpokedex</Link>

          </div>
        </div>
      </header>
      <body>
        <Routes>
          <Route path="/pokedexbrowser" element={<PokedexBrowser />} /> {/* Utilise element pour rendre le composant */}
          <Route path="/personalpokedex" element={<Personalpokedex/>}/>
        
        </Routes>

      </body>
    </div>
  );
}

export default App;
