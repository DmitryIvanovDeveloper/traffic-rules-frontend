import AuthTokenError from "./auth-token.error";

export default class TokenNotExistError extends AuthTokenError {
    constructor(){
        super(`Token is not exist`);
    }
}