describe('Trade License Renewal Flow', () => {
  it('should allow user to view the trade license playbook', () => {
    cy.visit('/flows/trade-license');
    cy.contains('Trade License Renewal Wizard').should('be.visible');
    cy.contains('Addis Ababa - Bole').should('be.visible');
    cy.contains('Document Preparation').should('be.visible');
    cy.contains('Start Application').should('be.visible');
  });
});
