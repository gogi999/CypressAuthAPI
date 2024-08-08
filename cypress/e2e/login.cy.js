/// <reference types="cypress" />

describe('/user/login', () => {
  const loginEndpoint = 'http://localhost:3000/api/user/login'

  it('Logs in with valid user', () => {
    let staticTestUser = {
      email: 'jane_doe@gmail.com',
      password: process.env.PASSWORD
    }
  
    cy.request({
      method: 'POST',
      url: loginEndpoint,
      body: staticTestUser
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
