import { HttpResponse, HtppRequest } from '../protocolos/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
    handle (httpRequest: HtppRequest): HttpResponse{
        if(!httpRequest.body.name){
            return badRequest(new MissingParamError('name'))
        }

        if(!httpRequest.body.email){
            return badRequest(new MissingParamError('email'))
        }

        return badRequest(new MissingParamError('nome'))
    }
}