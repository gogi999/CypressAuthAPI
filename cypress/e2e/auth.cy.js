/// <reference types="cypress" />

describe('/user/register', () => {
  const registerEndpoint = 'http://localhost:3000/api/user/register'
  it('Register creates user', () => {
    let body = {
      name: 'TestUser',
      email: 'testuser@email.com',
      password: process.env.PASSWORD // 
    }
  
    cy.request('POST', registerEndpoint, body)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq('TestUser')
        expect(response.body.email).to.eq('testuser@email.com')
        expect(response.body.password).to.eq(process.env.PASSWORD)
      })
  })

  it('Does not allow user creation with bad user body', () => {
    let badTestUser = {
      name: '1',
      email: 'testuser',
      password: process.env.PASSWORD // process.env.PASSWORD
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
      password: process.env.PASSWORD // process.env.PASSWORD
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
