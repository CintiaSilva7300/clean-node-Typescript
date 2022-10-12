export class MissingParamError extends Error {
    constructor (paramName: string) {
        super(`Missing parram: ${paramName}`)
        this.name = 'MissingParamError';
    }
}