describe('Sovereign Utility Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the Sovereign greeting', () => {
    cy.contains('h1', 'Welcome back').should('be.visible');
    cy.contains('GovAssist').should('be.visible');
    cy.contains('Ethiopia').should('be.visible');
  });

  it('should list available services with correct styling', () => {
    // Check for the Service Cards
    cy.contains('Common Services').scrollIntoView().should('be.visible');
    
    // Check for specific service: Trade License
    cy.contains('Trade License Renewal').should('be.visible');
    cy.contains('Est. 2 Days').should('be.visible');
    
    // Verify "Begin Process" button exists within the card
    cy.contains('Trade License Renewal')
      .parents('.group')
      .find('a')
      .contains('Start')
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
    cy.contains('Need Assistance?').scrollIntoView().should('be.visible');
    cy.contains('Contact Support').should('be.visible');
  });
});
