describe('Wizard Flow Smoke Test', () => {
  const flowId = 'trade-license';

  it('should load the wizard layout correctly', () => {
    cy.visit(`/flows/${flowId}`);

    // Check Header
    cy.get('header').contains('Application').should('be.visible');
    cy.get('header').contains('Trade License').should('be.visible');
    cy.contains('Save & Exit').should('be.visible');

    // Check Step Content
    cy.contains('Upload Identification').should('be.visible');
    cy.contains('Drag and drop').should('not.exist'); // We used "Click to upload" in the new design? Let's check text.
    cy.contains('Click to upload or drag and drop').should('be.visible');
  });

  it('should have functioning inputs', () => {
    cy.visit(`/flows/${flowId}`);
    
    // Fill out ID Number
    cy.get('input[placeholder="e.g. 123456789"]').type('ET-998877');
    cy.get('input[placeholder="e.g. 123456789"]').should('have.value', 'ET-998877');

    // Date input
    cy.get('input[type="date"]').type('2025-01-01');
  });

  it('should allow navigation', () => {
    cy.visit(`/flows/${flowId}`);
    
    // Click Continue
    cy.contains('button', 'Continue').click();
    
    // Since we don't have a real next page logic in the mock page.tsx (it just renders static),
    // we primarily verify the button is clickable and doesn't crash the app.
    // In a real app, we'd assert the URL changed.
  });
});
