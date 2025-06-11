import HomePage from '../support/page_models/home_page';
import LoginPage from '../support/page_models/login_page';


describe('Sample QA Test', () => {
   beforeEach(()=>{
    HomePage.visit();
   });

  it('Validate Home Page properly loaded', () => {
    HomePage.checkPageLoad();
  });

  

  it('Validate Form fill Page', () =>{
    HomePage.navigateFakeLandingPage();

  });
})