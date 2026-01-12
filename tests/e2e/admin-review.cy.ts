describe('Admin Governance Flows', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should navigate and manage the Manual Review Queue', () => {
    cy.contains('Review Queue').click();
    cy.url().should('include', '/admin/review');
    
    cy.contains('Manual Review Queue').should('be.visible');
    cy.contains('Trade License (Addis)').should('be.visible');
    
    // Select an item
    cy.contains('doc-101').click();
    
    // Verify Comparison UI
    cy.contains('Original Scan').should('be.visible');
    cy.contains('Verification Data').should('be.visible');
    cy.contains('Sign & Approve').should('be.visible');
  });

  it('should navigate and use the Policy Editor', () => {
    cy.contains('Policies').click();
    cy.url().should('include', '/admin/policies');
    
    cy.contains('Policy Registry').should('be.visible');
    cy.contains('trade-license.yaml').click();
    
    // Verify Editor
    cy.contains('Editing Draft').should('be.visible');
    cy.contains('Run Compliance Tests').should('be.visible');
    
    // Simulate test run
    cy.contains('Run Compliance Tests').click();
    cy.contains('PASSED').should('be.visible');
  });

  it('should verify system integrity in Audit Explorer', () => {
    cy.contains('Audit Logs').click();
    cy.url().should('include', '/admin/audit');
    
    cy.contains('Sovereign Audit Explorer').should('be.visible');
    cy.contains('Verify Merkle Root').click();
    
    // Wait for verification overlay
    cy.contains('Chain Verified!').should('be.visible');
  });
});
