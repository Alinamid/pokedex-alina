// PokemonDetails.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from './PokemonDetails';

describe('PokemonDetails component', () => {
  const pokemonMock = {
    name: 'Pikachu',
    sprites: {
      front_default: 'pikachu.png',
    },
    weight: 60,
  };

  test('renders Pokemon details correctly', () => {
    render(<PokemonDetails pokemon={pokemonMock} onClose={() => {}} />);
    
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    
    expect(screen.getByAltText('Pikachu')).toBeInTheDocument();
    
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  test('calls onClose when Close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<PokemonDetails pokemon={pokemonMock} onClose={onCloseMock} />);
    
    userEvent.click(screen.getByRole('button', { name: 'Close' }));
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
