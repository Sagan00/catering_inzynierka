import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const linkElement = screen.getByText((content, element) => content.startsWith('Zaloguj Się'));

  expect(linkElement).toBeInTheDocument();
});