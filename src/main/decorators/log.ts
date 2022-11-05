import {
  Controller,
  HtppRequest,
  HttpResponse,
} from "src/presentation/protocolos";

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(htppRequest: HtppRequest): Promise<any> {
    return await this.controller.handle(htppRequest);
  }
}
