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
       expect (httpResponse.body).toEqual(new Error('Missing param: name'))
    })

    test('Should return 400 if no email is provided', () => {
        const sut = new SignUpController()
        const httpRequesr = {
            body: {
                name: 'cintia',
                // email: 'cintia@gmail.com',
                password:'123',
                passwordConfirmation: '123',
            }
        }
       const httpResponse =  sut.handle(httpRequesr)
       expect (httpResponse.statusCode).toBe(400)
       expect (httpResponse.body).toEqual(new Error('Missing param: email'))
    })
})