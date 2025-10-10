export interface ModelTypeProps {
    id: number;
    langIso: string;
    name: string;
}

export default class ModelType {
    public readonly id: number;
    public readonly langIso: string;
    public readonly name: string;

    constructor(props: ModelTypeProps) {
        this.id = props.id;
        this.langIso = props.langIso;
        this.name = props.name;
    }

    public static fromApi(data: { id: number; lang_iso: string; name: string }): ModelType {
        return new ModelType({
            id: data.id,
            langIso: data.lang_iso,
            name: data.name
        });
    }

    public toApi(): { id: number; lang_iso: string; name: string } {
        return {
            id: this.id,
            lang_iso: this.langIso,
            name: this.name
        };
    }
}

