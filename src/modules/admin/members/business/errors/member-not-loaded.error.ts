import MemberError from "./member.error";

export default class MemberNotLoadedError extends MemberError {

    constructor() {
        super('')
    }
}