describe('Trade License Renewal Flow', () => {
  it('should allow user to view the trade license playbook', () => {
    cy.visit('/flows/trade-license');
    cy.contains('Trade License Renewal').should('be.visible');
    cy.contains('Official process for renewing business operations').should('be.visible');
    cy.contains('Continue').should('be.visible');
  });
});
