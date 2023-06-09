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