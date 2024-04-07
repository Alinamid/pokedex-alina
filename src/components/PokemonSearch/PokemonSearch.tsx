import React, { useState, useEffect } from 'react';
import { NamedAPIResource } from 'pokenode-ts';
import './PokemonSearch.style.css';

interface PokemonSearchProps {
  onSearch: (searchTerm: string, type?: string) => void;
  pokemonTypes: NamedAPIResource[];
  defaultSearch?: string;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ onSearch, pokemonTypes, defaultSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearch);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    setSearchTerm(defaultSearch);
  }, [defaultSearch]);

  const handleSearch = () => {
    onSearch(searchTerm, selectedType);
  };

  
  const handleChooseType = (selectType: string) => {
    setSelectedType(selectType);
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
      <select
        className="type-dropdown"
        value={selectedType}
        onChange={(e) => handleChooseType(e.target.value)}
      >
        <option value="">All Types</option>
        {pokemonTypes.map((type) => (
          <option key={type.name} value={type.name}>{type.name}</option>
        ))}
      </select>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PokemonSearch;
