class LoginPage{

    private loginPageHeading = '.sign-in__form>.page__heading';
    private emailLabel = "div.form__group>label[for='user\[email\]']";
    private emailInputBox = '#user\[email\]';
    private pwdLabel = "div.form__group>label[for='user\[password\]']";
    private pwdInputBox = '#user\[password\]';
    private rememberMeCheckBox = "input#user\[remember_me\]";
    private signInButton = 'Sign in';

    checkLoginPageLoaded(){
        cy.get( this.loginPageHeading ).should( 'be.visible' )
        .get( this.emailLabel).should('be.visible')
        .get( this.pwdLabel).should('be.visible')
        .contains( 'button', this.signInButton).should('be.visible'); 
    }
    private enterEmail( email:string ){
        cy.get( this.emailInputBox ).type( email );
    }
    private enterPwd( pwd:string ){
        cy.get( this.pwdInputBox ).type( pwd );
    }
    private clickSignin(){
        cy.contains( 'button', this.signInButton ).click();
    }
    private checkRemember(){
        
    }


    login( email: string, pwd: string ){
        this.enterEmail( email );
        this.enterPwd( pwd );
        this.clickSignin();
    }




}

export default new LoginPage();
