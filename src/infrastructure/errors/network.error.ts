import IErrorResponse from "../dtos/errorResponse";
import { AppError } from "./app.error";

export class NetworkError extends AppError {
    public error?: IErrorResponse;
    
    constructor(code: string, message: string, error?: IErrorResponse) {
        super(message, code);
        this.error = error;
    }
}