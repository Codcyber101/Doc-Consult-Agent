describe('Internationalization (i18n) and Localization', () => {
  beforeEach(() => {
    // Force a large viewport to ensure desktop elements are visible
    cy.viewport(1920, 1080);
    // Clear localStorage to ensure a clean state
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display English by default and allow switching to Amharic', () => {
    // 1. Verify English (Default)
    cy.contains('h1', 'Welcome back').should('be.visible');
    
    // 2. Open Language Switcher
    cy.get('[data-testid="language-switcher"]').click();
    
    // 3. Select Amharic
    cy.get('[data-testid="lang-option-am"]').click();

    // 4. Verify Amharic Translations
    cy.contains('h1', 'እንኳን ደህና መጡ').should('be.visible');
    
    // Check Sidebar items - use force:true if still hidden for some reason
    cy.contains('ዳሽቦርድ').should('exist');
    cy.contains('አገልግሎቶች').should('exist');
    cy.contains('የኔ ተራ').should('exist');
    
    // Check for parameterized translation in Service Card
    cy.contains('ግምት 2 ቀናት').should('be.visible');
    cy.contains('ጀምር').should('be.visible');
  });

  it('should persist language preference after reload', () => {
    // 1. Switch to Amharic
    cy.get('[data-testid="language-switcher"]').click();
    cy.get('[data-testid="lang-option-am"]').click();
    cy.contains('h1', 'እንኳን ደህና መጡ').should('be.visible');

    // 2. Reload page
    cy.reload();

    // 3. Verify it's still in Amharic
    cy.contains('h1', 'እንኳን ደህና መጡ').should('be.visible');
    cy.get('[data-testid="language-switcher"]').contains('AM').should('be.visible');
  });

  it('should localize the Services catalog page', () => {
    // 1. Switch to Amharic
    cy.get('[data-testid="language-switcher"]').click();
    cy.get('[data-testid="lang-option-am"]').click();

    // 2. Navigate to Services (use force: true to bypass visibility check if needed)
    cy.contains('አገልግሎቶች').click({ force: true });

    // 3. Verify Services page translations
    cy.contains('h1', 'የመንግስት አገልግሎቶችን ያግኙ').should('be.visible');
    cy.contains('ምድቦች').should('be.visible');
    cy.contains('ንግድ').should('be.visible');
    cy.contains('የግል').should('be.visible');
    cy.contains('የዲጂታል ዝግጁነት').should('be.visible');
    cy.contains('ክፍያ').should('be.visible');
  });

  it('should localize the Service Detail page', () => {
    // 1. Navigate to a specific service while in Amharic
    cy.get('[data-testid="language-switcher"]').click();
    cy.get('[data-testid="lang-option-am"]').click();
    
    // Click on a service card (Trade License Renewal)
    cy.contains('የንግድ ፈቃድ እድሳት').click({ force: true });

    // 2. Verify Detail page translations
    cy.contains('ወደ ማውጫው ተመለስ').should('be.visible');
    cy.contains('በሉዓላዊነት የተረጋገጠ').should('be.visible');
    cy.contains('አስፈላጊ ሰነዶች').should('be.visible');
    cy.contains('ተደጋግሞ የሚነሱ ጥያቄዎች').should('be.visible');
    cy.contains('ለመጀመር ተዘጋጅተዋል?').should('be.visible');
    cy.contains('የአገልግሎት ክፍያ').should('be.visible');
  });
});