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
      it('A blog can be created', function() {

        cy.get('#createNewBlog-button').click()
        cy.get('#title').type('Someblog')
        cy.get('#author').type('SomeAuthor')
        cy.get('#url').type('someurl')
        cy.get('#create-button').click()

        cy.contains('Someblog')

      })
      describe('blog exist', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'testtitle',
            author: 'testauthor',
            url: 'testurl'
          })
        })
        it('can like a blog', function() {
          cy.contains('testtitle')
            .contains('view')
            .click()
          cy.contains('like').click()
        })
        it('can remove blog', function() {
          cy.contains('testtitle')
            .contains('view')
            .click()
          cy.contains('remove').click()
        })
        it('only creator can remove', function() {
          cy.contains('logout').click()
          const user = {
            name: 'Test Testinen',
            username: 'testihenkilo',
            password: 'sala'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.login({ username: 'testihenkilo', password: 'sala' })
          cy.contains('testtitle')
            .contains('view')
            .click()
          cy.contains('remove').should('not.be.visible')
        })
        it.only('blogs are sorted by likes', function() {
          cy.createBlog({
            title: 'The title with the most likes',
            author: 'mostliked',
            url: 'testurl'
          })
          cy.createBlog({
            title: 'The title with the second most likes',
            author: 'scndmostliked',
            url: 'testurl'
          })
          cy.contains('The title with the most likes')
            .contains('view')
            .click()
          cy.contains('The title with the second most likes')
            .contains('view')
            .click()
          cy.get('.blog').eq(1).should('contain', 'The title with the most likes')
          cy.get('.blog').eq(2).should('contain', 'The title with the second most likes')
          cy.get('.blogAll').eq(1).contains('like').click()
          cy.get('.blogAll').eq(0).contains('like').click()
          cy.get('.blogAll').eq(2).contains('like').click()
          cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
          cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        })
      })
    })
  })
})