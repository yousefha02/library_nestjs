import { Controller, Post , Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { EmailRegister, SignPassword, VerfiyCode } from "./dto";

@Controller("user")
export class UserController{
    constructor(private userService:UserService){}

    @Post('email-register')
    registerEmail(@Body() dto:EmailRegister)
    {
        return this.userService.registerEmail(dto)
    }

    @Post('verify-code')
    verrifyCode(@Body() dto:VerfiyCode)
    {
        return this.userService.verifyCode(dto)
    }

    @Post('sign-password')
    SignPassword(@Body() dto:SignPassword)
    {
        return this.userService.signPassword(dto)
    }
}