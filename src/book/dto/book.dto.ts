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