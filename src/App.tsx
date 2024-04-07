import { useState, useEffect } from 'react';
import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import './App.css';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';

function App() {
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');
  const [pokemonTypes, setPokemonTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const api = new PokemonClient();
        const data = await api.listPokemons(0, 14000);
        setAllPokemons(data.results);
        setDisplayedPokemons(data.results);
      } catch (error) {
        console.error('Error fetching all Pokémon:', error);
      }
    };

    const fetchPokemonTypes = async () => {
      try {
        const api = new PokemonClient();
        const typesResponse = await api.listTypes();
        const types: NamedAPIResource[] = typesResponse.results;
        setPokemonTypes(types);
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchAllPokemons();
    fetchPokemonTypes();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(0);
    setLastSearchTerm(searchTerm);
    if (!searchTerm.trim()) {
      setDisplayedPokemons(allPokemons);
      return;
    }
  
    const filteredResults = allPokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setDisplayedPokemons(filteredResults);
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(displayedPokemons.length / 10) - 1;
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectPokemon = (pokemon: any) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      {!selectedPokemon && (
        <div className="search-container">
          <PokemonSearch onSearch={handleSearch} pokemonTypes={pokemonTypes} defaultSearch={lastSearchTerm} />
        </div>
      )}
      <div className="main-content">
        <div className="search-results-container">
          {selectedPokemon ? (
            <PokemonDetails pokemon={selectedPokemon} onClose={handleCloseDetails} />
          ) : (
            <PokemonList
              pokemons={displayedPokemons.slice(currentPage * 10, (currentPage + 1) * 10)}
              onSelectPokemon={handleSelectPokemon}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              disablePrev={currentPage === 0}
              disableNext={currentPage >= Math.ceil(displayedPokemons.length / 10) - 1}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
