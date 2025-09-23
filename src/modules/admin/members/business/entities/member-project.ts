import { MemberDTO } from "../dtos/load-members.dto";
import { MemberProjectDTO } from "../dtos/member-project.dto";

interface IProps {
	readonly id: number;
    readonly userId: number;
    readonly projectId: string;
    readonly projectName: string;
    readonly active: boolean;
}
export class MemberProject {
	public readonly id: number;
    public readonly userId: number;
    public readonly projectId: string;
    public readonly projectName: string;
    public readonly active: boolean;

	constructor(props: Partial<IProps>) {
		this.id = props.id ?? -1;
		this.userId = props.userId ?? -1;
		this.projectId = props.projectId ?? '';
		this.projectName = props.projectName ?? '';
		this.active = props.active ?? false;
	}

	public withUpdatedActive(active: boolean): this {
		return this.cloneWith({active});
	}

	public cloneWith(props: Partial<IProps>): this {
		return new MemberProject({
			id: this.id,
			projectId: this.projectId,
			projectName: this.projectName,
			active: props.active ?? this.active
		}) as this;
	}

	public static toEntity(id: number, projectId: string, projectName: string, active: boolean): MemberProject {
		return new MemberProject({
			id,
			projectId,
			projectName,
			active
		})
	}
}
