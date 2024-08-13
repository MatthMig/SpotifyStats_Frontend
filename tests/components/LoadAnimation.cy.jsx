import { mount } from '@cypress/react18';
import { LoadAnimation } from '../../src/components/LoadAnimation';

describe('LoadAnimation', () => {
  beforeEach(() => {
    mount(<LoadAnimation />);
  });

  it('renders without errors', () => {
    cy.get('.loading-container').should('exist');
  });

  it('displays the spinner', () => {
    cy.get('.loading-container').find('.spinner-border').should('exist');
  });
});