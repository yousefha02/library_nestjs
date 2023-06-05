import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailRegister {
    @IsEmail()
    email:string
}

export class VerfiyCode {
    @IsNotEmpty()
    code:string

    @IsEmail()
    email:string
}