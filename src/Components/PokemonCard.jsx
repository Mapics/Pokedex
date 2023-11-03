import React from 'react'
import { useEffect, useState } from 'react'

export default function PokemonCard({pokemon}) {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [loading , setLoading] = useState(true);

    useEffect(() => {
      fetch(`${pokemon.url}`, { 
        method: "GET",
      }).then((res) => res.json()) // convert data to json
      .then((data) => {
        setPokemonInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err)
      })
    }, [])
    
    const addToTeam = () => {
      const team = JSON.parse(localStorage.getItem("team")) || []
      team.push(pokemonInfo)
      localStorage.setItem("team", JSON.stringify(team))
    }

  return (
    <div className="pokemon-card">

      <div className="pokemon-image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`}
          alt={pokemonInfo.name}
        />
      </div>

      <div className="pokemon-details">
        <p>Nom: {pokemon.name}</p>
        <p>Numéro: {pokemonInfo.id}</p>
        
        <p>Types: {pokemonInfo.types ? (pokemonInfo.types.map((type, index) => (
            <span key={index}>{type.type.name}{index < pokemonInfo.types.length - 1 ? ',' : ''}</span>
            ))
        ) : (
            "Chargement en cours..."
        )}</p>

        <button class="raise" onClick={addToTeam}>Ajouter au Pokedex</button>
      </div>
    </div>
  )
}