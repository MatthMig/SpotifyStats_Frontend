import { mount } from '@cypress/react18';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage';

describe('<HomePage />', () => {
  it('displays a loading spinner and message when loading', () => {
    mount(
      <Router>
        <HomePage />
      </Router>
    );

    // Assert that the loading spinner and message are displayed
    cy.get('.spinner-border').should('be.visible');
    cy.contains('Spotify data are loading...').should('be.visible');
  });
});