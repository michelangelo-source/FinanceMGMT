import {loginExampleData} from "../data/loginExampleData";

describe('template spec', () => {
  it('passes', () => {
    const { username, password } =loginExampleData
    cy.login(username, password)
    cy.get('[ data-cy="newTransaction"]').click();
    cy.url().should('include', '/transaction');
    cy.get('input[id="incomes"]').click();
    cy.get('select').select('Salary')
    cy.get('input[id="amount"]').type('5000');
    cy.get('input[id="title"]').type('wypłata');
    cy.get('input[id="description"]').type('po 10');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/mainPage');
    cy.get('[ data-cy="newTransaction"]').click();
    cy.url().should('include', '/transaction');
    cy.get('input[id="expenditures"]').click();
    cy.get('select').select('Rent')
    cy.get('input[id="amount"]').type('3200');
    cy.get('input[id="title"]').type('czynsz');
    cy.get('input[id="description"]').type(':(');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/mainPage');
    cy.contains('button','Logout').click();
  })
})