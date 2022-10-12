import { InvalidParamError } from './../errors/invalid-param-error';
import { EmailValidator } from './../protocolos/email-validator';
import { Controller } from './../protocolos/controller';
import { HttpResponse, HtppRequest } from '../protocolos/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController implements Controller{
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator){
        this.emailValidator = emailValidator
    }
    handle (httpRequest: HtppRequest): HttpResponse | any{

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
        // return badRequest(new MissingParamError('name'))
    }
}