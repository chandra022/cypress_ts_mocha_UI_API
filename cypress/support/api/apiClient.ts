/// <reference types="cypress" />


export class ApiClient{
    private baseUrl: string;


    constructor(){
        this.baseUrl = Cypress.env("apiBaseUrl");
    }

     // Function overloads for multiple get request variations
    get(endpoint: string): Cypress.Chainable<Cypress.Response<any>>;
    get(endpoint: string, headers: Record<string, string>): Cypress.Chainable<Cypress.Response<any>>;
    get(endpoint: string, params: Record<string, string>, headers?: Record<string, string>): Cypress.Chainable<Cypress.Response<any>>;

     // Function implementation
    get(endpoint: string, arg1?: Record<string, string>, arg2?: Record<string, string>): Cypress.Chainable<Cypress.Response<any>> {
      let headers: Record<string, string> = {};
      let params: Record<string, string> = {};

      if (arg1 && !arg2) {      //  no arg2 means only headers are provided along with endpoint
        headers = arg1;
      } else if (arg1 && arg2) {    //  if both arguments are exist then user provided queryParams and headers along with endpoint
        params = arg1;
        headers = arg2;
      }

      return cy.request({
        method: "GET",
        url: `${this.baseUrl}${endpoint}`,
        qs: params, 
        headers,
      });
    }

    // get(endPoint: string, headers: Record<string, string> ={} ){
    //     return cy.request({
    //         method: 'GET',
    //         url: `${this.baseUrl}${endPoint}`,
    //         headers,
    //     });
    // }

    // get( endPoint: string, queryParams: Object, headers: Record<string, string>={}){
    //   return cy.request({
    //       method: 'GET',
    //       url: `${this.baseUrl}${endPoint}`,
    //       qs: queryParams,
    //       headers,
    // });
    // }

    post(endpoint: string, body: any, headers: Record<string, string> = {}): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
          method: "POST",
          url: `${this.baseUrl}${endpoint}`,
          body,
          headers,
        });
      }
    
    put(endpoint: string, body: any, headers: Record<string, string> = {}): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
          method: "PUT",
          url: `${this.baseUrl}${endpoint}`,
          body,
          headers,
        });
    }
    

    delete(endpoint: string, headers: Record<string, string> = {}) : Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
          method: "DELETE",
          url: `${this.baseUrl}${endpoint}`,
          headers,
        });
    }
    
}