import AuthenticationError from "./authentication.error";

export default class UserNotRegisteredError extends AuthenticationError {
    constructor() {
        super(``);
    }
} 