import React from 'react'
import { useEffect, useState } from 'react'


export default function PokemonCard({pokemon, emplacement}) {

  const addPokemonToPersonalPokedex = (pokemon) => {
  // Obtenir le Pokedex personnel depuis la mémoire locale
    const currentPokedex = new Set(JSON.parse(localStorage.getItem('personalPokedex')) || []);

    if (!currentPokedex.has(pokemon)) {
      // Ajouter le Pokémon au Pokedex personnel
      currentPokedex.add(pokemon);
      // Mettre à jour le Pokedex personnel dans la mémoire locale
      localStorage.setItem('personalPokedex', JSON.stringify(Array.from(currentPokedex)));

      // Afficher une alerte pour indiquer que le Pokémon a été ajouté
      window.alert(`${pokemon.name} a été ajouté à votre Pokedex !`);
      console.log(localStorage.getItem('personalPokedex'));
    }
  };

  const removeFromTeam = (name) => {
    // Obtenir le Pokedex personnel depuis la mémoire locale
    const currentPokedex = new Set(JSON.parse(localStorage.getItem('personalPokedex')) || []);
    for (let i of Array.from(currentPokedex)){
      if (i.name === name){
      // Supprimer le Pokémon du Pokedex personnel
        currentPokedex.delete(i);
      }
    }
    // Mettre à jour le Pokedex personnel dans la mémoire locale
    localStorage.setItem('personalPokedex', JSON.stringify(Array.from(currentPokedex)));

    // Recharger la page pour refléter la suppression du Pokémon
    window.location.reload()

    // Afficher une alerte pour indiquer que le Pokémon a été relâché
    window.alert(`${name} a été relaché !`);
  };

  const [pokemonInfo, setPokemonInfo] = useState([])
    const [loading , setLoading] = useState(true);

    useEffect(() => {
      // Récupérer les informations du Pokémon en utilisant son URL
      fetch(`${pokemon.url}`, { 
        method: "GET",
      }).then((res) => res.json())
      .then((data) => {
        // Mettre à jour les informations du Pokémon
        setPokemonInfo(data);
        // Mettre fin au chargement
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err)
      })
    }, [])
    


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

        {emplacement === "PokedexBrowser" ? (
          <button className="raise" onClick={() => addPokemonToPersonalPokedex(pokemon)}>Ajouter au Pokedex</button>
        ) : emplacement === "PersonalPokedex" ? (
          <button className="raise" onClick={() => removeFromTeam(pokemon.name)}>Relacher</button>
        ) : null}
      </div>
    </div>
  )
}