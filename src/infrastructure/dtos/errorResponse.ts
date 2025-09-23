import { ErrorType } from "./error-type";

export default interface IErrorResponse {
    error: ErrorType;
    errors: any;
    message: string | string[]
}