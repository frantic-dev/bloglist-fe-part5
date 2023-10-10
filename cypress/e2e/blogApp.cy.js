import { func } from 'prop-types'
import blogs from '../../src/services/blogs'

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

  describe('When logged in', function () {
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

    describe('a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a very interesting title',
          author: 'author',
          url: 'url',
        })
      })

      it('a user can like a blog', function () {
        cy.get('.blog-btn').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('a user can delete a blog', function () {
        cy.get('.blog-btn').click()
        cy.contains('remove').click()
        cy.contains('remove').should('not.exist')
      })

      it('only the creator can delete a blog', function () {
        cy.contains('logout').click()
        cy.get('.blog-btn').click()
        cy.contains('remove').should('not.exist')
      })
    })
    describe.only('multiple blogs exist', () => {
      let blogs = []
      beforeEach(function () {
        Array.from({ length: 8 }).map(() => {
          const newBlog = {
            title: 'a very interesting title',
            author: 'author',
            url: 'url',
            likes: Math.floor(Math.random() * 1000),
          }
          cy.createBlog(newBlog)
          blogs.push(newBlog)
        })
      })
      it('blogs are ordered according to likes', function () {
        const sortedBlogsByLikes = blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)

        cy.get('.blog').each(blog => {
          cy.wrap(blog).contains('view').click()
        })

        cy.get('.blog-likes').each((blogLikes, index) => {
          cy.wrap(blogLikes[index]).contains(sortedBlogsByLikes[index].likes)
        })

        // another way of checking blogs are sorted by likes
        // for (let i = 0; i <= 7; i++) {
        //   let number = sortedBlogsByLikes[i]
        //   console.log(number)
        //   cy.get('.blog-likes').eq(i).contains(number.likes)
        // }
      })
    })
  })
})
