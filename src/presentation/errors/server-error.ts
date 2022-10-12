export class ServerError extends Error {
    constructor () {
        super("Error servidor")
        this.name = 'ServerError';
    }
}