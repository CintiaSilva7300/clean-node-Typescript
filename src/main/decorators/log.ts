import { LogErrorRepository } from "./../../data/protocols/log-error-repository";
import {
  Controller,
  HtppRequest,
  HttpResponse,
} from "src/presentation/protocolos";

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(htppRequest: HtppRequest): Promise<any> {
    const httpResponse = await this.controller.handle(htppRequest);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
