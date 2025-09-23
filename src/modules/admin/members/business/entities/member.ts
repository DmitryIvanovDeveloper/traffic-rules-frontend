import { MemberDTO } from "../dtos/load-members.dto";
import { MemberProject } from "./member-project";

interface IProps {
	readonly id: number;
	readonly email: string;
	readonly firstName: string;
	readonly lastName: string;
    readonly avatar: string | null;
    readonly userName: string;
    readonly tests: number;

}
export class Member {
	public readonly id: number;
	public readonly email: string;
	public readonly firstName: string;
	public readonly lastName: string;
    public readonly avatar: string | null;
    public readonly userName: string;
    public readonly tests: number;
	
	constructor(props: Partial<IProps>) {
		this.id = props.id ?? -1;
		this.email = props.email ?? '';
		this.firstName = props.firstName ?? '';
		this.lastName = props.lastName ?? '';
		this.avatar = props.avatar ?? null;
		this.userName = props.userName ?? '';
		this.tests = props.tests ?? 0
	}

	
	public cloneWith(props: Partial<IProps>): this {
		return new Member({
			id: props.id ?? this.id,
			email: props.email ?? this.email,
			firstName: props.firstName ?? this.firstName,
			lastName: props.lastName ?? this.lastName,
			avatar: props.avatar ?? this.avatar,
			userName: props.userName ?? this.userName,
		}) as this;
	}

	public static toEntity(dto: MemberDTO, tests?: number): Member {
		return new Member({
			id: dto.id,
			email: dto.email,
			firstName: dto.firstName,
			lastName: dto.lastName,
			avatar: dto.avatar,
			userName: dto.userName,
			tests
		})
	}
}
