describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aku Tuhkanen',
      username: 'akutuh',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('akutuh')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Aku Tuhkanen logged in')
      cy.get('#createNewBlog-button').click()
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('akutuh')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'akutuh', password: 'salainen' })
      })
      it.only('A blog can be created', function() {

        cy.get('#createNewBlog-button').click()
        cy.get('#title').type('Someblog')
        cy.get('#author').type('SomeAuthor')
        cy.get('#url').type('someurl')
        cy.get('#create-button').click()

        cy.contains('Someblog')

      })
    })
  })
})