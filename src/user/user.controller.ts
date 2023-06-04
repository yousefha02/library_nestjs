import { Controller, Post , Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { EmailRegister } from "./dto";

@Controller("user")
export class UserController{
    constructor(private userService:UserService){}

    @Post('email-register')
    registerEmail(@Body() dto:EmailRegister)
    {
        return this.userService.registerEmail(dto)
    }
}