/// <reference types="cypress" />

describe('/user/register', () => {
  const registerEndpoint = 'http://localhost:3000/api/user/register'
  it('Register creates user', () => {
    let body = {
      name: 'TestName',
      email: 'foo@bar.com',
      password: 'Test09876' // process.env.PASSWORD
    }
  
    cy.request('POST', registerEndpoint, body)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq('TestName')
        expect(response.body.email).to.eq('foo@bar.com')
        expect(response.body.password).to.eq('Test09876')
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
