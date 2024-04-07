import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonList from './PokemonList';

describe('PokemonList component', () => {
  const pokemonsMock = [
    { name: 'Pikachu' },
    { name: 'Bulbasaur' },
    { name: 'Charmander' },
  ];

  const onSelectPokemonMock = jest.fn();
  const onPrevPageMock = jest.fn();
  const onNextPageMock = jest.fn();

  test('renders Pokemon list correctly', () => {
    render(
      <PokemonList
        pokemons={pokemonsMock}
        onSelectPokemon={onSelectPokemonMock}
        onPrevPage={onPrevPageMock}
        onNextPage={onNextPageMock}
        disablePrev={false}
        disableNext={false}
      />
    );

    pokemonsMock.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('calls onSelectPokemon when a Pokemon is clicked', () => {
    render(
      <PokemonList
        pokemons={pokemonsMock}
        onSelectPokemon={onSelectPokemonMock}
        onPrevPage={onPrevPageMock}
        onNextPage={onNextPageMock}
        disablePrev={false}
        disableNext={false}
      />
    );

    fireEvent.click(screen.getByText('Pikachu'));

    expect(onSelectPokemonMock).toHaveBeenCalledWith(pokemonsMock[0]);
  });

  test('calls onPrevPage and onNextPage when Prev and Next buttons are clicked', () => {
    render(
      <PokemonList
        pokemons={pokemonsMock}
        onSelectPokemon={onSelectPokemonMock}
        onPrevPage={onPrevPageMock}
        onNextPage={onNextPageMock}
        disablePrev={false}
        disableNext={false}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));

    expect(onPrevPageMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(onNextPageMock).toHaveBeenCalledTimes(1);
  });
});
