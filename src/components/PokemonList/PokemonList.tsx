import React from 'react';
import './PokemonList.style.css';

interface PokemonListProps {
  pokemons: any[];
  onSelectPokemon: (pokemon: any) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelectPokemon, onPrevPage, onNextPage, disablePrev, disableNext }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon: any) => (
        <div key={pokemon.name} onClick={() => onSelectPokemon(pokemon)} className="pokemon-box">
          <p>{pokemon.name}</p>
        </div>
      ))}
      <div className="button-container">
        <button onClick={onPrevPage} disabled={disablePrev}>Prev</button>
        <button onClick={onNextPage} disabled={disableNext} >Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
