// PokemonSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonSearch from './PokemonSearch';

describe('PokemonSearch component', () => {
  const pokemonTypesMock = [
    { name: 'Grass' },
    { name: 'Fire' },
    { name: 'Water' },
  ];

  const onSearchMock = jest.fn();

  test('renders Pokemon search input and button correctly', () => {
    render(
      <PokemonSearch
        onSearch={onSearchMock}
        pokemonTypes={pokemonTypesMock}
        defaultSearch=""
      />
    );

    expect(screen.getByPlaceholderText('Search Pokemon by name')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onSearch with correct parameters when search button is clicked', () => {
    render(
      <PokemonSearch
        onSearch={onSearchMock}
        pokemonTypes={pokemonTypesMock}
        defaultSearch=""
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokemon by name'), {
      target: { value: 'Pikachu' },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Grass' },
    });

    fireEvent.click(screen.getByText('Search'));

    expect(onSearchMock).toHaveBeenCalledWith('Pikachu', 'Grass');
  });

  test('calls onSearch with correct parameters when search input value changes', () => {
    render(
      <PokemonSearch
        onSearch={onSearchMock}
        pokemonTypes={pokemonTypesMock}
        defaultSearch=""
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokemon by name'), {
      target: { value: 'Charmander' },
    });

    expect(onSearchMock).toHaveBeenCalledWith('Charmander', '');
  });
});
