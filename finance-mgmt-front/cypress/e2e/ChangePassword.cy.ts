import {loginExampleData} from "../data/loginExampleData";

describe('template spec', () => {
  it('passes', () => {
    const { username, password } =loginExampleData
    cy.login(username, password)
    cy.contains('a','My account').click();
    cy.contains('p','Change password').click();
    cy.get('input[name="oldPassword"]').type(loginExampleData.password);
    cy.get('input[name="newPassword"]').type(loginExampleData.password+"123");
    cy.contains('button','Change').click();
    cy.contains('button','Logout').click();
    cy.login(username, password+"123")
    cy.contains('a','My account').click();
    cy.contains('p','Change password').click();
    cy.get('input[name="oldPassword"]').type(loginExampleData.password+"123");
    cy.get('input[name="newPassword"]').type(loginExampleData.password);
    cy.contains('button','Change').click();
    cy.contains('button','Logout').click();
    cy.login(username, password)
    cy.contains('button','Logout').click();


  })
})