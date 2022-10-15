import { ServerError } from './../errors/server-error';
import { EmailValidator } from './../protocolos/email-validator';
import { InvalidParamError } from './../errors/invalid-param-error';
import { MissingParamError } from '../errors/missing-param-error';
import { SignUpController } from './signup';

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {

    const emailValidatorStub = makeEmailValidator();
    const sut = new SignUpController(emailValidatorStub)
    return {sut, emailValidatorStub }
}

describe('Signup Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const { sut } = makeSut()
        const httpRequesr = {
            body: {
                // name: 'cintia',
                email: 'cintia@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequesr)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return 400 if no email is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'cintia',
                // email: 'cintia@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no passwor is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'cintia@gmail.com',
                // password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no passwordConfirmation is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'cintia@gmail.com',
                password:'123',
                // passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })

    test('Should return 400 if password confirmation fails', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'cintia@gmail.com',
                password:'123',
                passwordConfirmation: 'invalid_password',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
    })

    test('Should return 400 if an invalid email is provided', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'invalid_email@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new InvalidParamError('email'))
    })

    test('Should call EmailValidator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
       const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'any_nvalid_email@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       sut.handle(httpRequest)
       expect (isValidSpy).toHaveBeenCalledWith('any_nvalid_email@gmail.com')
    })

    test('Should return 500 if EmailValidator thorows', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(()=> {
            throw new Error()
        })
        const httpRequest = {
            body: {
                name: 'cintia',
                email: 'any_email@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect (httpResponse.statusCode).toBe(500)
       expect (httpResponse.body).toEqual(new ServerError())
    })
})