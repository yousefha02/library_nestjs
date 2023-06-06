import { Controller, Post , Body, Put, UseInterceptors, UploadedFile } from "@nestjs/common";
import { UserService } from "./user.service";
import { EmailRegister, SignPassword, UpdateProfle, VerfiyCode } from "./dto";
import {FileInterceptor} from '@nestjs/platform-express/multer'
import { CustomStorage } from "src/custome.storage";

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

    @Post('login')
    login(@Body() dto:SignPassword)
    {
        return this.userService.login(dto)
    }

    @Put('update-profile')
    @UseInterceptors(FileInterceptor('file',{storage:CustomStorage.storage}))
    updateProfile(@Body() dto:UpdateProfle,@UploadedFile() file: Express.Multer.File)
    {
        return this.userService.updateProfile(dto,file)
    }
}