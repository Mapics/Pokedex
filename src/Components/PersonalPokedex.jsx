import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

export default function PersonalPokedex() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Charger l'équipe de Pokémon depuis la mémoire locale
    const teamData = JSON.parse(localStorage.getItem('personalPokedex')) || [];
    setTeam(teamData);
  }, []);

  const clearTeam = () => {
    // Supprimer l'équipe de Pokémon de la mémoire locale
    localStorage.removeItem('personalPokedex');
    // Réinitialiser l'équipe à vide
    setTeam([]);
  }

  return (
    <div>
      <h2>Équipe Pokémon</h2>
      <button className="raise" onClick={clearTeam} id="clearbutton">Tout effacer</button>
      {team.length === 0 ? (
        <p>Votre équipe Pokémon est vide.</p>
      ) : (
        <ul>
          {team.map((name) => (
            <PokemonCard key={name} pokemon={name} emplacement="PersonalPokedex"/>
          ))}
        </ul>
      )}
    </div>
  );
}