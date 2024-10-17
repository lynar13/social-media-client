describe("Login and Logout Flow", () => {
  beforeEach(() => {
    cy.visit("/index.html"); 
  });

  it("should allow the user to log in with valid credentials", () => {
    cy.intercept("POST", "**/social/auth/login", {
      statusCode: 200,
      body: { accessToken: "mockToken", name: "Test User" },
    }).as("loginRequest");

    // Simulate filling in the form and submitting it
    cy.get('input[name="email"]').type("user@stud.noroff.no");
    cy.get('input[name="password"]').type("validPassword");
    cy.get("form#loginForm").submit();

    // Wait for the login request
    cy.wait("@loginRequest");

    // Assert that the token is stored in localStorage and that the user is logged in
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.eq("mockToken");
    });

    cy.get('button[data-auth="logout"]').should("be.visible");
  });

  it("should display an error for invalid login credentials", () => {
    cy.intercept("POST", "**/social/auth/login", {
      statusCode: 401,
      body: { message: "Unauthorized" },
    }).as("loginRequest");

    cy.get('input[name="email"]').type("invalid@stud.noroff.no");
    cy.get('input[name="password"]').type("wrongPassword");
    cy.get("form#loginForm").submit();

    cy.wait("@loginRequest");

    // Check if an error message is displayed
    cy.get(".error-message").should("contain", "Unauthorized");
  });

  it("should allow the user to log out", () => {
    // First, log in the user
    cy.intercept("POST", "**/social/auth/login", {
      statusCode: 200,
      body: { accessToken: "mockToken", name: "Test User" },
    }).as("loginRequest");

    cy.get('input[name="email"]').type("user@stud.noroff.no");
    cy.get('input[name="password"]').type("validPassword");
    cy.get("form#loginForm").submit();

    cy.wait("@loginRequest");

    // Then, log the user out
    cy.get('button[data-auth="logout"]').click();

    // Ensure the token is removed from localStorage
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.be.null;
    });

    cy.get('button[data-auth="login"]').should("be.visible");
  });
});
