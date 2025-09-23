import GetUserResponse from "../../infrastructure/repositories/dtos/get-users.dto";

export class MemberDTO {
	public readonly id: number;
	public readonly email: string;
	public readonly firstName: string;
	public readonly lastName: string;
    public readonly avatar: null;
    public readonly userName: string;

   	constructor(response: GetUserResponse) {
		this.id = response.id;
		this.email = response.user.email;
		this.firstName = response.user.first_name;
		this.lastName = response.user.last_name;
		this.avatar = response.avatar;
		this.userName = response.user_name;
	}
}
