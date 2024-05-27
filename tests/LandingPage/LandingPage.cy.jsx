import { mount } from '@cypress/react18';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from '../../src/pages/LandingPage';

describe('<LandingPage />', () => {
  it('renders', () => {
    cy.mount(
      <Router>
        <LandingPage />
      </Router>
    );
  });
  it('displays a notification if one is stored in localStorage', () => {
    // Set a notification in localStorage before visiting the page
    cy.window().then((win) => {
      win.localStorage.setItem('notification', 'Test notification');
    });

    // Mount the LandingPage component
    mount(
      <Router>
        <LandingPage />
      </Router>
    );

    // Assert that the notification is displayed
    cy.contains('Test notification').should('be.visible');
  });
});