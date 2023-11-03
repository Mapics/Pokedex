import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

export default function PokedexBrowser() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [researchList, setResearchList] = useState([]);
  const [searchDelay, setSearchDelay] = useState(null);

  const changeSearch = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);

    if (searchDelay) {
      clearTimeout(searchDelay);
    }

    setSearchDelay(
      setTimeout(() => {
        setLoading(true);
        if (newSearch) {
          // Rechercher des Pokémon en fonction du texte saisi
          fetch(`https://pokeapi.co/api/v2/pokemon-form?limit=9999`)
            .then((res) => res.json())
            .then((data) => {
              const filtered = data.results.filter(pokemon =>
                pokemon.name.includes(newSearch.toLowerCase())
              );
              setResearchList(filtered);
              setLoading(false);
            })
            .catch((err) => {
              console.log("error", err);
              setLoading(false);
            });
        } else {
          setResearchList([]);
          setLoading(false);
        }
      }, 300)
    );
  };

  const loadNextPage = () => {
    setOffset(offset + 20);
  };

  const loadPrevPage = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
    }
  };

  useEffect(() => {
    // Charger la liste complète de Pokémon en utilisant l'offset
    fetch(`https://pokeapi.co/api/v2/pokemon-form?offset=${offset}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  }, [offset]);

  const displayList = search ? researchList : pokemonList;

  return (
    <div>
      <input
        className="researchinput"
        type="text"
        value={search}
        onChange={changeSearch}
        placeholder="Rechercher un Pokémon..."
      />

      <h2>Liste des Pokémon</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {displayList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} emplacement="PokedexBrowser" />
          ))}
        </ul>
      )}
      <button onClick={loadPrevPage} disabled={offset === 0}>Retour</button>
      <button onClick={loadNextPage}>Suivant</button>
    </div>
  );
}