/// <reference types="cypress" />

it('Returns 200 when we hit /register', () => {
  cy.request('POST', 'http://localhost:3000/api/user/register')
    .then((response) => {
      expect(response.status).to.eq(200)
    })
})
