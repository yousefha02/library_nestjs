import { IsEmail } from "class-validator";

export class EmailRegister {
    @IsEmail()
    email:string
}