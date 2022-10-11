import { HttpResponse, HtppRequest } from '../protocolos/http';
import { MissingParamError } from '../errors/missing-param-error';

export class SignUpController {
    handle (httpRequest: HtppRequest): HttpResponse{
        if(!httpRequest.body.name){
            return {
                statusCode: 400,
                body:new MissingParamError('name') 
            }   
        }

        if(!httpRequest.body.email){
            return {
                statusCode: 400,
                body:new MissingParamError('email') 
            }   
        }

        return {
            statusCode: 400,
            body:new MissingParamError('name') 
        }
    }
}