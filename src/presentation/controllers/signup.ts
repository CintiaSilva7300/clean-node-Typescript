import { HttpResponse, HtppRequest } from '../protocolos/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
    handle (httpRequest: HtppRequest): HttpResponse{
          
        const requiredFields = ['nome', 'email']
        for(const field of requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }
        }

        return badRequest(new MissingParamError('nome'))

    }
}