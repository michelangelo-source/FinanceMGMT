import {loginExampleData} from "../data/loginExampleData";

describe('template spec', () => {

  it('passes', () => {
    const { username, password } = loginExampleData
    cy.login(username, password)
    const savingGoal=Math.random().toString();
    cy.contains('a','Saving goals').click();
    cy.url().should('include', '/saving-goals');
    cy.contains('button','Add').click();
    cy.get('input[name="goal"]').type('300');
    cy.get('input[name="description"]').type(savingGoal);
    cy.get('input[type="submit"]').click();
    cy.contains('div',savingGoal).click();
    cy.contains('button','Deposit').click();
    cy.get('input[name="amount"]').type('200');
    cy.get('input[name="title"]').type('krok');
    cy.get('input[name="description"]').type('jeszcze trochę');
    cy.get('input[type="submit"]').click();
  })
})