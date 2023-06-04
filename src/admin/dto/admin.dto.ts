import { IsEmail,IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AdminRegister {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    password:string;
}