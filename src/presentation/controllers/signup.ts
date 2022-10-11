export class SignUpController {
    handle (httpRequesr: any): any{
        return {
            statusCode: 400,
            body:new Error('Missing param: name') 
        }   
    }
}