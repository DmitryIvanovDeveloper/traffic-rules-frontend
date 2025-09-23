import Result from "@/infrastructure/helpers/result";
import { MemberDTO } from "../dtos/load-members.dto";
import { MemberProjectDTO } from "../dtos/member-project.dto";

export default interface IMembersHttpRepository {
    assignMemberProject(projectId: string, userId: number): Promise<Result<void>>;
    unassignMemberProject(userId: number): Promise<Result<void>>;
    loadMembers(): Promise<Result<ReadonlyArray<MemberDTO>>>;
    loadMemberProjects(id: number): Promise<Result<ReadonlyArray<MemberProjectDTO>>>
}
