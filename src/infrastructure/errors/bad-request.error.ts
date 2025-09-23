import IErrorResponse from "../dtos/errorResponse";
import { NetworkError } from "./network.error";

export class BadRequestError extends NetworkError {
    constructor(error?: IErrorResponse) {
        super('400', "Bad Request", error);
    }
}