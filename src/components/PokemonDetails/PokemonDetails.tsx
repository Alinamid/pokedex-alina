import React, { useEffect, useState } from 'react';
import { PokemonClient } from 'pokenode-ts';
import './PokemonDetails.style.css';

interface PokemonDetailsProps {
  pokemon: any;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const api = new PokemonClient();
        const data = await api.getPokemonByName(pokemon.name);
        console.log('pokemon data', data);
        setPokemonDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.name]);

  return (
    <div className="pokemon-details-card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemonDetails.sprites?.front_default} alt={pokemon.name} />
          <p>Weight: {pokemonDetails.weight}</p>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
