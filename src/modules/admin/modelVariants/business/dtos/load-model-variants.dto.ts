export default class LoadModelVariantsDTO {
    constructor(
        public readonly modelId: string
    ) {}

    public static toRequestDto(dto: LoadModelVariantsDTO): any {
        return {
            model_id: dto.modelId
        };
    }
}








