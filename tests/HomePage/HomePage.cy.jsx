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

  it('displays the homepage when loaded', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('spotifyAuthToken', 'mockToken');
    });
  
    cy.intercept('POST', `${process.env.REACT_APP_BACKEND_URL}/spotify/fetchUserData`, {
      statusCode: 200,
      body: {}
    }).as('backendAPI');

    mount(
      <Router>
        <HomePage />
      </Router>
    );
    cy.wait('@backendAPI');

    // Check if the loading spinner and message are not displayed
    cy.get('.spinner-border').should('not.exist');
    cy.contains('Spotify data are loading...').should('not.exist');

    // Assert that the homepage is displayed
    cy.contains('Welcome to the Homepage!').should('be.visible');
    cy.contains('Spotify data loaded!').should('be.visible');
  });
});