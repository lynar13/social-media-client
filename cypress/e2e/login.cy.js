describe('Login functionality', () => {
    beforeEach(() => {
      cy.visit('/login'); // Navigate to your login page
    });
  
    it('The user can log in with the login form with valid credentials', () => {
      cy.get('input[name="username"]').type('validUser');
      cy.get('input[name="password"]').type('validPass');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); // Assuming redirection to dashboard
      cy.get('localStorage').should('have.property', 'token');
    });
  
    it('The user cannot submit the login form with invalid credentials and is shown a message', () => {
      cy.get('input[name="username"]').type('invalidUser');
      cy.get('input[name="password"]').type('wrongPass');
      cy.get('button[type="submit"]').click();
      cy.get('.error-message').should('be.visible').and('contain', 'Invalid credentials');
    });
  });
  