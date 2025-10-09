export default class CreateDamageTypesDTO {
    constructor(
        public readonly damageTypes: Array<{
            langIso: string;
            name: string;
        }>
    ) {}

    public static toRequestDto(dto: CreateDamageTypesDTO): any {
        return dto.damageTypes.map(dt => ({
            lang_iso: dt.langIso,
            name: dt.name
        }));
    }
}









