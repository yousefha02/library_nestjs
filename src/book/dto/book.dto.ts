import { IsNotEmpty } from "class-validator";

export class CreateBook {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    publishYear:string

    @IsNotEmpty()
    pages:number;

    @IsNotEmpty()
    categoryId:number;
}

export class CreateBookLanguage {
    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    lang:string

    @IsNotEmpty()
    authorName:string;

    @IsNotEmpty()
    bookId:number;
}

export class UpdateBook { 
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    publishYear:string

    @IsNotEmpty()
    pages:number;

    @IsNotEmpty()
    categoryId:number;

    @IsNotEmpty()
    bookId:number;
}

export class UpdateBookTranslation {
    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    authorName:string;

    @IsNotEmpty()
    bookTranslationId:number;
}