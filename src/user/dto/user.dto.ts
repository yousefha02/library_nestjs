import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength ,Max} from "class-validator";

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

export class UpdateProfle {
    @IsNotEmpty()
    userId:string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    name:string;
}

export class UserSubscribe {
    @IsNotEmpty()
    userId:string;
}

export class Rating {
    @IsNotEmpty()
    userId:string;

    @IsNotEmpty()
    bookId:string;

    @IsNotEmpty()
    @MinLength(5)
    conent:string;

    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rate:number;
}

export class AddQuote {
    @IsNotEmpty()
    userId:string;

    @IsNotEmpty()
    bookId:string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(160)
    comment:string;
}