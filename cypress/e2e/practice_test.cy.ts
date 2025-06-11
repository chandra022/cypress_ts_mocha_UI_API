/// <reference types="cypress-downloadfile"/>

describe.skip("Practice Test Suite", () => {

    it("User Contact Admin Test", () => {
        cy.visit('https://ultimateqa.com/complicated-page');

        cy.get('#et_pb_contact_name_0',{timeout: 10000}).scrollIntoView()
            .invoke('attr','placeholder' ).should('eq', 'Name');
           
        cy.get( '#et_pb_contact_email_0' ).should( 'have.attr', 'placeholder', 'Email Address');

        cy.get( '#et_pb_contact_message_0' ).should( 'have.attr', 'placeholder', 'Message' );

        cy.fixture("sample_flow_data")
        .then( ( data ) => {
            const contactInfo = data.contactAdmin;
            cy.log( JSON.stringify( contactInfo ) );

            cy.get('#et_pb_contact_name_0' ).type( contactInfo.name );
            cy.get('#et_pb_contact_email_0' ).type( contactInfo.mail );
            cy.get('#et_pb_contact_message_0' ).type( contactInfo.userMessage );
            cy.get( 'span.et_pb_contact_captcha_question' ).eq(0)
            .then( ($elm) => {
                const captchaStr : string = $elm.text();
                // let nums : number[];
                // if( captchaStr.indexOf( '+' ) >= 0 ){
                //     nums = captchaStr.split( "+" ).map( val => parseInt( val.trim() ) );
                // }

                let captchaRes = 0;
                captchaStr.split( "+" ).forEach( val => captchaRes+= parseInt( val.trim() ) );

                cy.get( 'input[name="et_pb_contact_captcha_0"]' ).type( captchaRes.toString() );
                cy.get( 'button[name="et_builder_submit_button"]' ).eq(0).click();

                cy.get( 'div.et-pb-contact-message p' ).scrollIntoView().should('be.visible');

                

            })


        })
    })
})


describe("Demo QA Site Practice - Elements", () => {

    // beforeEach(()=> {
    //     cy.visit( 'https://demoqa.com/' );

    //      // Navigates to Elements Page
    //      cy.get( `h5` ).contains( `Elements` )
    //         .parent( `div.card-body` )
    //         .prev().find('svg').click();

    //     cy.url().should( 'contain', '/elements');
    // })

    it("Handling with Text box", ()=> {
       

        // Handling Text Box
        cy.get( `span.text` ).contains( `Text Box` ).click();
        cy.get( `span.text` ).contains( `Text Box` )
            .parent()
            .invoke( 'attr', 'class' )
            .should( 'contain', 'active' );
        cy.url().should( 'contain', 'text-box');
        
        // Fill Details
        cy.get( '#userName' )
            .invoke( 'attr', 'autocomplete' ).should( 'eq', 'off' );
        cy.get( '#userName' )
            .invoke( 'attr', 'placeholder' ).should( 'eq', 'Full Name' );
        cy.get( '#userName' ).click({force: true})   
            .type( 'Chandrasekhar Parchuri', {force: true} );
        cy.get( '#userEmail' )
            .invoke( 'attr', 'autocomplete' ).should( 'eq', 'off' );
        cy.get( '#userEmail' )
            .invoke( 'attr', 'placeholder' ).should( 'eq', 'name@example.com' );
        cy.get( '#userEmail' )
            .type( 'parchuri.chandrasekhar@yahoo.co.in' );
        cy.get( 'textarea#currentAddress' )
            .invoke( 'attr', 'placeholder' ).should( 'eq', 'Current Address' );
        cy.get( 'textarea#currentAddress' )
            .type( 'Hyd-Telangana India' );
        cy.get( 'textarea#permanentAddress' )
            .type( 'Hyd-Telangana India' );
        cy.get( 'button#submit' ).click();

        cy.get( 'p#name' ).should( 'have.text', 'Name:Chandrasekhar Parchuri');
        cy.get( 'p#email' ).should( 'have.text', 'Email:parchuri.chandrasekhar@yahoo.co.in');
        
        
        // cy.get( 'p#currentAddress' ).invoke('text').should( 'include.text', 'Current Address:Hyd-Telangana India');// assertexpected 
        // 'Current Address :Hyd-Telangana India&nbsp;' 
        // to have text 'Current Address:Hyd-Telangana India'
        

        cy.get('p#currentAddress')
            .invoke('text')
            .then((text) => {
                const normalizedText = text.replace(/\u00A0/g, ' ').replace(/\s+/g, '').trim();
                expect(normalizedText).to.eq('CurrentAddress:Hyd-TelanganaIndia');
            });

        cy.get('p#permanentAddress')
            .invoke('text')
            .then((text) => {
                const normalizedText = text.replace(/\u00A0/g, ' ').replace(/\s+/g, '').trim();
                expect(normalizedText).to.eq('PermananetAddress:Hyd-TelanganaIndia');
            });


       


    });

    it( "Handling with Buttons", () => {

        cy.visit( 'https://demoqa.com/buttons' );


         //  Handling Buttons
         cy.get( `span.text` ).contains( `Buttons` ).click();
         cy.url().should( `contain`, `/buttons` );
         cy.get( `button#doubleClickBtn` ).dblclick();       //Perform Double Click
         cy.get( `p#doubleClickMessage` ).should( `be.visible` );
         cy.get( `p#doubleClickMessage` ).should( `have.text`, `You have done a double click` );
 
         cy.get( `button#rightClickBtn` ).rightclick();       //Perform Right Click
         cy.get( `p#rightClickMessage` ).should( `be.visible` );
         cy.get( `p#rightClickMessage` ).should( `have.text`, `You have done a right click` );
 
         cy.get( `button.btn.btn-primary` ).eq(2).click();       //Perform Click
         cy.get( `p#dynamicClickMessage` ).should( `be.visible` );
         cy.get( `p#dynamicClickMessage` ).should( `have.text`, `You have done a dynamic click` );
 
    });


    it( 'Handling with Links', () => {
        cy.visit( 'https://demoqa.com/links' );

        cy.get( `#simpleLink` ).scrollIntoView( {duration:1000, easing : 'linear', offset: { top:100, left: 500}} )
        .should( 'have.attr', 'target', '_blank' )
            .invoke( 'removeAttr', 'target' )
            .click();
        
        cy.go( 'back' );
    })

    it.only('Handling File Download and Upload', () => {

        cy.visit( 'https://demoqa.com/upload-download' );

         // cy.downloadFile(
        //     'https://example.com/sample.pdf', // file URL
        //     'cypress/downloads',              // download folder
        //     'sample.pdf'                      // file name
        //   );


        cy.get( '#downloadButton' )
            .then( ( $elm ) => {
                const href = $elm.attr( 'href' );
                const fileName = $elm.attr( 'download' ) || 'download_image.jpeg';
                
                // Validate the href contains base64
                expect(href).to.include('base64,');
                const base64Data = href?.split('base64,')[1];

                // Convert base64 string to binary and write to file
                if (base64Data) {
                    const filePath = `cypress/fixtures/${fileName}`;

                    // Use cy.task to write file from Node context
                    cy.task('writeBase64File', { filePath, base64Data }).then(() => {
                    cy.log(`File written to ${filePath}`);
                    });
                }

            });
        

        // cy.get('#fileUpload').attachFile({
        //     filePath: 'sample.pdf',
        //     fileName: 'uploaded-sample.pdf',
        //     mimeType: 'application/pdf'
            // });
        cy.get( '#uploadFile' ).attachFile( 'downloads.htm' );
           
    })
})



