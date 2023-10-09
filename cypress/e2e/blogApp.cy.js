describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'fso',
      username: 'fso',
      password: 'fso',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('fso')
      cy.get('#password').type('fso')
      cy.get('#login-btn').click()

      cy.contains('fso logged in')
      cy.get('.notification').contains('successfully logged in')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('fso')
      cy.get('#password').type('shoot')
      cy.get('#login-btn').click()

      cy.contains('fso logged in').should('not.exist')
      cy.get('.notification').contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'fso',
        password: 'fso',
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a very interesting title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')

      cy.get('#create-blog-btn').click()
      cy.contains('a very interesting title')
    })
  })
})
