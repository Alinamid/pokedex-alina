import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('renders the app with search container initially', () => {
    render(<App />);
    expect(screen.getByText('Search Pokemon by name')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('renders the app with search results container when a search is performed', () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText('Search Pokemon by name'), 'Pikachu');
    userEvent.click(screen.getByText('Search'));

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('renders the app with pokemon details container when a pokemon is selected', () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText('Search Pokemon by name'), 'Pikachu');
    userEvent.click(screen.getByText('Search'));
    userEvent.click(screen.getByText('Pikachu'));

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Weight:')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
  });
});
