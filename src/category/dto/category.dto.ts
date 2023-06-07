import { IsNotEmpty } from "class-validator";

export class TranslationCategory {
    @IsNotEmpty()
    categoryId:number

    @IsNotEmpty()
    lang:string

    @IsNotEmpty()
    title:string
}

export class UpdateCategory {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    categoryTranslationId:number
}