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
});