/// <reference types="cypress" />

const Guid = require('guid')

describe('/user/register', () => {
  const registerEndpoint = 'http://localhost:3000/api/user/register'
  it('Register creates user', () => {
    let dynamicEmail = Guid.raw() + '@bar.com'
    let body = {
      name: 'TestUser',
      email: dynamicEmail,
      password: 'pass123456' // process.env.PASSWORD
    }
  
    cy.request('POST', registerEndpoint, body)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq('TestUser')
        expect(response.body.email).to.eq(dynamicEmail)
        expect(response.body.password).to.eq('pass123456')
      })
  })

  it('Does not allow user creation with bad user body', () => {
    let badTestUser = {
      name: '1',
      email: 'testuser',
      password: '1' // process.env.PASSWORD
    }
  
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Does not allow user creation with invalid email', () => {
    let badTestUser = {
      name: 'ValidName',
      email: 'invalidEmail',
      password: 'validPassword' // process.env.PASSWORD
    }
  
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.eq('"email" must be a valid email')
    })
  })

  it('Cannot create duplicate user', () => {
    let goodTestUser = {
      name: 'ValidName',
      email: 'doNotDeleteEmail@email.com',
      password: 'validPassword' // process.env.PASSWORD
    }
  
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.eq('Email already registered!')
    })
  })
  
  it('Returns 400 when we hit /register with no body', () => {
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
  
})
