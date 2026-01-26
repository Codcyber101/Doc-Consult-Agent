describe('Sovereign Utility Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the Sovereign greeting', () => {
    cy.contains('h1', 'Selam').should('be.visible');
    cy.contains('GovAssist').should('be.visible');
    cy.contains('Ethiopia').should('be.visible');
  });

  it('should list available services with correct styling', () => {
    // Check for the Service Cards
    cy.contains('Available Services').scrollIntoView().should('be.visible');
    
    // Check for specific service: Trade License
    cy.contains('Trade License').should('be.visible');
    cy.contains('500 ETB').should('be.visible');
    
    // Verify "Begin Process" button exists within the card
    cy.contains('Trade License')
      .parents('.group')
      .find('button')
      .contains('Begin Process')
      .should('exist');
  });

  it('should have a working navigation bar', () => {
    // Desktop Nav
    cy.get('nav').should('be.visible');
    cy.contains('Services').should('be.visible');
    
    // Check for User Profile (mocked)
    cy.contains('Abebe').should('be.visible');
  });

  it('should show the Digital Vault feature', () => {
    cy.contains('Digital Document Vault').scrollIntoView().should('be.visible');
    cy.contains('Open Vault').should('be.visible');
  });
});
