import { HttpResponse, HtppRequest } from '../protocolos/http';

export interface Controller {
    handle(htppRequest: HtppRequest): HttpResponse
}