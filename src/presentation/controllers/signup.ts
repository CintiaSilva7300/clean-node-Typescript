import { Controller } from './../protocolos/controller';
import { HttpResponse, HtppRequest } from '../protocolos/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController implements Controller{
    handle (httpRequest: HtppRequest): HttpResponse{

        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for(const field of requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }
        }

        return badRequest(new MissingParamError('name'))

    }
}