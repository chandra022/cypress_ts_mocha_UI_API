//  Debug the failures or Debugging the Execution


//  Date & Time functions in TypeScript


//  Generating Random values in TypeScript



//  Keyboard actions uisng Cypress





//  Network Stabbing using Cypress




//  Handling SQL Queries in Cypress





//  Flaky Test Management
//       --> By enabling Test Retires
        import { defineConfig } from 'cypress';
        export default defineConfig({
            retries : {
                runMode: 2,
                openMode: 0
            }
        })

            // export default defineConfig({
            //     retries : 2                      for both Run and Open mode
            // })

            // describe("Test suite", 
            //     {
            //         retries : {                          Describe block level
            //             runMode:3,
            //             openMode: 1,
            //         }
            //     },
            //     () => {
            //     it( "Login Validation", 
            //         {
            //             retries:{                        It block level
            //                 runMode: 2,
            //                 OpenMode: 1,
            //             },
            //         },
            //     () => {
            //         .......
            //     }) 
            // })