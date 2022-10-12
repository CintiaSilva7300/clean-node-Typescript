import { MissingParamError } from '../errors/missing-param-error';
import { SignUpController } from './signup';

describe('Signup Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController()
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
        const sut = new SignUpController()
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
        const sut = new SignUpController()
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
        const sut = new SignUpController()
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
})