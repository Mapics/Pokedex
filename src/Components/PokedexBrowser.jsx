import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokedexBrowser() {
  const [pokemonList, setPokemonList] = useState([])
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=20" , {
      method: "GET",
    }).then((res) => res.json()) // convert data to json
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, []);

  return (
    <div>
      <h2>Liste des Pokémon</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon, index) => (
            <a key={index}>
              <PokemonCard pokemon={pokemon}/>
            </a>
          ))}
        </ul>
      )}
    </div>
  )
}
