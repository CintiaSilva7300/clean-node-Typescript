import { HttpResponse, HttpRequest } from "../protocolos/http";

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
