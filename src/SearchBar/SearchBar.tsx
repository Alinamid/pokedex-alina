import React, { useState, useEffect } from 'react';
import { PokemonClient } from 'pokenode-ts';
import './SearchBar.style.css';

interface SearchBarProps {
  onSearch: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemon, setAllPokemon] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const api = new PokemonClient();
        const data = await api.listPokemons(0);
        setAllPokemon(data.results);
      } catch (error) {
        console.error('Error fetching all Pokemon:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleSearch = () => {
    const filteredResults = allPokemon.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredResults);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search Pokemon by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
