import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../src/components/Navigation';

describe('Navigation Component', () => {
  it('should navigate to the correct route when links are clicked', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Replace 'text of the link' with the actual text content of each link
    const menuLink = screen.getByText('Menu');
    const cartLink = screen.getByText('Koszyk');
    const calcLink = screen.getByText('Kalkulator BMR');
    const mealsListLink = screen.getByText('Lista posiłków');
    const contactLink = screen.getByText('Kontakt');
    const aboutLink = screen.getByText('O nas');
    const accountLink = screen.getByText('Konto');

    fireEvent.click(menuLink);
    // Assert navigation to the /menu route

    fireEvent.click(cartLink);
    // Assert navigation to the /cart route

    fireEvent.click(calcLink);
    // Assert navigation to the /calc route

    fireEvent.click(mealsListLink);
    // Assert navigation to the /mealsList route

    fireEvent.click(contactLink);
    // Assert navigation to the /contact route

    fireEvent.click(aboutLink);
    // Assert navigation to the /about route
    fireEvent.click(accountLink);
    // Assert navigation to the /account route
  });
});