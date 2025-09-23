export default interface IConstructorViewModel {
    readonly id: string;
    readonly title: string;
    readonly elements: Array<IConstructorElementViewModel>;
}

export interface IConstructorElementViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLabel: boolean;
    readonly type: ElementType;
    readonly value: string | Array<IFileViewModel>;
    readonly required?: boolean;
    readonly placeholder?: string;
    readonly content?: any[];
    readonly options?: IOptionsViewModel;
}

export interface IOptionsViewModel {
    readonly label?: string;
    readonly subtype?: 'number' | 'text' | 'email' | 'phone' | 'date' | 'datetime' | 'daterange' |  'single' | 'multiple';
    readonly required?: boolean;
    readonly accept: Array<any>;
    readonly limit?: number;
    readonly data?: string | ISelectViewModel | Array<ISelectViewModel> | ICheckBoxViewModel | Array<ICheckBoxViewModel>;
    readonly placeholder?: string;
}

export interface IFileViewModel {
    readonly id: string;
    readonly name: string;
}

export interface ISelectViewModel {
    id: string;
    value: string;
}

export interface ICheckBoxViewModel {
    id: string;
    required: boolean;
    label: string;
    checked: boolean;
}

export enum ElementType {
    Textarea = 'textarea',
    File = 'file',
    Paragraph = 'p',
    Input = 'input',
    Select = 'select',
    Date = 'date',
    Checkbox = 'checkbox',
    Upload = 'file',
    Richtext = 'richtext',
}
