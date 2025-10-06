export default class LoadCustomModelsDTO {
    constructor(
        public readonly projectId: string
    ) {}

    public static toRequestDto(dto: LoadCustomModelsDTO): any {
        return {
            project_id: dto.projectId
        };
    }
}



