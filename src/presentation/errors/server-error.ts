export class ServerError extends Error {
  constructor(stack: string | undefined) {
    super("Error servidor");
    this.name = "ServerError";
    this.stack = stack;
  }
}
