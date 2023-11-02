import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokedexBrowser() {
  const [pokemonList, setPokemonList] = useState([])
  const [loading , setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-form?offset=${offset}&limit=20`, {
      method: "GET",
    }).then((res) => res.json()) // convert data to json
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [offset]);
  
  const loadNextPage = () => {
    setOffset(offset + 20);
    setLoading(true);
  };
  
  const loadPrevPage = () => {
    setOffset(offset - 20)
    setLoading(true);
  };

  return (
    <div>
      <h2>Liste des Pokémon</h2>
      {loading ? ( <p>Chargement en cours...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon) => (
              <PokemonCard pokemon={pokemon}/>
          ))}
        </ul>
      )}
      <button onClick={loadPrevPage}>Retour</button>
      <button onClick={loadNextPage}>Suivant</button>
    </div>
  )
}
