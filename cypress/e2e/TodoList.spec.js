describe('test my todolist', () => {
    it('test create todos', () => {
        cy.visit('/')
        .get('.h-5 > path').click()
    })

    it('test delete todos', () => {
        cy.visit('/')
        .get(':nth-child(1) > .w-full > .flex > button > .h-6').click()

    })
})