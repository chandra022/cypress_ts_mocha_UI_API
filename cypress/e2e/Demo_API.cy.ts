import { UserInfo } from "../support/api/api_services/user_info";
import { SingleUser, UserData } from "../support/api/models/single_user";
import { UsersList } from "../support/api/models/list_users";


describe("User API Test Suite", ()=> {
    const userinfo = new UserInfo();

    it("Validate Single User Information", ()=>{
        userinfo.getByUserId(2)
            .then( ( info: SingleUser ) => {
                // expect( info ).to.have.property('data').to.have.property('id',2);

                const userData = info.data;
                const supportInfo = info.support;

                expect( userData ).to.have.property('id',2);
                expect( userData ).to.have.property("fName").that.is.a("string").eql( 'Janet');
                expect( userData ).to.have.property("lName").that.is.a("string").eqls( 'Weaver');
                expect( userData ).to.have.property("email").that.includes("@reqres.in");
                expect( supportInfo ).to.have.property( 'url', "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral" );

                console.log( userData );
                console.log( supportInfo );
                
            });
    });

    it("Validate User List Information", ()=>{
        userinfo.getUsersByPage (2)
            .then( ( info: UsersList ) => {
                console.log( info );
                expect( info ).to.have.property('page',2);

                const usersData: UserData[] = info.data;
                const supportInfo = info.support;
                let userId :number = 7;

                usersData.forEach( (userInfo) =>{
                    expect( userInfo ).to.have.property('id', userId);
                    expect( userInfo ).to.have.property('fName' ).that.is.a("string");
                    expect( userInfo ).to.have.property('lName' ).that.is.a("string");
                    expect( userInfo ).to.have.property("email").to.match(/^([\w-]+\.)+[\w-]+@([\w-]+\.)+[\w-]{2}$/);
                    expect( userInfo ).to.have.property("email").to.match(/@reqres.in$/);
                    expect( userInfo ).to.have.property('avatar').to.match(/^https?:\/\/[^\s$.?#].[^\s]*$/);
                    expect( userInfo ).to.have.property('avatar').to.match( /${userId}\-image\.jpg$/ );
                    userId++;

                });

                console.log( usersData );

                expect( supportInfo ).to.have.property( 'url', "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral" );
                console.log( supportInfo );
                
            });
    });




});