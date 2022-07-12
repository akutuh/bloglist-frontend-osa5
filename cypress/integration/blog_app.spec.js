describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'akutuh', name: 'Aku Tuhkanen', password: 'salainen'
      })
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('akutuh')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Aku Tuhkanen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('akutuh')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})