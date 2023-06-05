import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

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

export class SignPassword {
    @IsNotEmpty()
    @MaxLength(12)
    @MinLength(4)
    password:string

    @IsEmail()
    email:string
}