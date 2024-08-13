import { mount } from '@cypress/react18';
import MostPlayedSongsRecently from '../../src/components/MostPlayedSongsRecently';

describe('MostPlayedSongsRecently', () => {
  beforeEach(() => {
    mount(<MostPlayedSongsRecently />);
  });

  it('renders without errors', () => {
    cy.get('div').should('exist');
  });

  it('displays loading state', () => {
    cy.get('.loading-container').should('exist');
  });
});