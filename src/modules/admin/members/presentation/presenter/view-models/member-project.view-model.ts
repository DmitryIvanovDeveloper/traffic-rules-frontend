import { Member } from "../../../business/entities/member";
import { MemberProject } from "../../../business/entities/member-project";

export default class MemberProjectViewModel {
    public readonly projectId: string;
    public readonly projectName: string;
    public readonly active: {
        title: string
        value: boolean;
    };
	
    constructor(entity: MemberProject) {
        this.projectId = entity.projectId;
        this.projectName = entity.projectName;
        this.active = {
            title: entity.active ? 'Активный' : 'Не активный',
            value: entity.active
        }
    }
}