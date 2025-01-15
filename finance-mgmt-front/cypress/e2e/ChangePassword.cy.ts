import {loginExampleData} from "../data/loginExampleData";

describe('User data', () => {
    it('Change password', () => {
        const {username, password} = loginExampleData
        cy.login(username, password)
        cy.get('[data-cy="navbar My account"]').click();
        cy.get('[data-cy="changePasswordBtn"]').click();
        cy.get('input[name="oldPassword"]').type(loginExampleData.password);
        cy.get('input[name="newPassword"]').type(loginExampleData.password + "123");
        cy.get('[data-cy="submitPasswordChange"]').click();
        cy.get('[data-cy="logout"]').click();
        cy.login(username, password + "123")
        cy.get('[data-cy="navbar My account"]').click();
        cy.get('[data-cy="changePasswordBtn"]').click();
        cy.get('input[name="oldPassword"]').type(loginExampleData.password + "123");
        cy.get('input[name="newPassword"]').type(loginExampleData.password);
        cy.get('[data-cy="submitPasswordChange"]').click();
        cy.contains("div","Changed successfully").should("be.visible");
    })
})