import { AppError } from "@/infrastructure/errors/app.error";

export default class MemberError extends AppError {
    constructor(message: string) {
        super(message, "MEMBER_ERROR")
    }
}