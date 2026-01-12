describe('Sovereign Trade License Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete the full SME trade license renewal flow', () => {
    // 1. Service Discovery
    cy.contains('Popular Services').should('be.visible');
    cy.contains('Trade License').click();
    
    // 2. Step 1: Jurisdiction
    cy.url().should('include', '/flows/trade-license');
    cy.contains('Where is your business located?').should('be.visible');
    
    cy.get('select').first().select('Addis Ababa');
    cy.get('select').last().select('Bole');
    
    cy.contains('Next Step').click();

    // 3. Step 2: Requirements
    cy.contains('Renewal Requirements').should('be.visible');
    cy.contains('TIN Certificate').should('be.visible');
    cy.contains('Next Step').click();

    // 4. Step 3: Document Upload & Analysis
    cy.contains('Document Readiness').should('be.visible');
    cy.contains('Readiness Score').should('be.visible');
    
    // Check for upload zones
    cy.get('input[type="file"]').should('have.length.at.least', 1);
    
    cy.contains('Next Step').click();

    // 5. Step 4: Submission & Consent
    cy.contains('Ready to Submit').should('be.visible');
    cy.contains('Submit Online').click();

    // 6. Consent Modal
    cy.contains('Data Processing Consent').should('be.visible');
    cy.get('input[type="checkbox"]').check();
    cy.contains('Agree & Submit').click();

    // 7. Tracking
    cy.contains('Application Submitted!').should('be.visible');
    cy.contains('ET-MESOB-2026-X99').should('be.visible');
    cy.contains('Application Status').should('be.visible');
    
    // Verify timeline
    cy.contains('Received by MESOB').should('be.visible');
    
    // Return Home
    cy.contains('Return to Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
