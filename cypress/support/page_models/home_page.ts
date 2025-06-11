class HomePage{

    private automationPracticeTitle = '#Automation_Practice > span > strong > span > span';
    private bigPageWithManyElements = `a[href='../complicated-page']`;
    private fakeLandingPage = `a[href='../fake-landing-page']`;
    private loginAutomation = 'Login automation';           //, { matchCase: false }

    visit(){
        cy.visit('/');
    }

    checkPageLoad(){
        cy.get(this.automationPracticeTitle).should('be.visible');
    }
    navigateBigPageWithManyElms(){
        cy.get( this.bigPageWithManyElements ).click();
    }
    navigateFakeLandingPage(){
        cy.get( this.fakeLandingPage ).click();
    }
    navigateLoginAutomation(){
        cy.contains('a', this.loginAutomation, {matchCase: false} )
            .invoke('removeAttr', 'target')
            .click(
                // {force:true}
            ); 
    }
}

export default new HomePage();