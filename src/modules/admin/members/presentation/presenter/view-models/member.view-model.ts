import { Member } from "../../../business/entities/member";

export default class MemberViewModel {
	public readonly id: number;
	public readonly email: string;
	public readonly name: string;
    public readonly avatar: string | null;
    public readonly userName: string;
    public readonly tests: number;

    constructor(entity: Member) {
        this.id = entity.id;
        this.email = entity.email;
        this.name = `${entity.firstName} ${entity.lastName}`;
        this.avatar = entity.avatar;
        this.userName = entity.userName;
        this.tests = entity.tests;
    }
}