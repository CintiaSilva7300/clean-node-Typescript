import { badRequest } from '../helpers/http-helper';

import { Controller, EmailValidator,  HtppRequest, HttpResponse} from '../protocolos';
import { MissingParamError, InvalidParamError, ServerError} from '../errors';

export class SignUpController implements Controller{
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator){
        this.emailValidator = emailValidator
    }
    handle (httpRequest: HtppRequest): HttpResponse | any{
        try{
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for(const field of requiredFields) {
                if(!httpRequest.body[field]){
                    return badRequest(new MissingParamError(field))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if(!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        }catch (error) {
            return new ServerError()
        }

        // return badRequest(new MissingParamError('name'))
    }
}