export class InvalidParamError extends Error {
    constructor (paramName: string) {
        super(`Invalid parram: ${paramName}`)
        this.name = 'InvalidParamError';
    }
}