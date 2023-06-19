import { Controller, Post , Body, Put, UseInterceptors, UploadedFile, UseGuards,Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddQuote, EmailRegister, AddQuoteComment, Rating, SignPassword, UpdateProfle, UserSubscribe, VerfiyCode, AddLikeQuote } from "./dto";
import {FileInterceptor} from '@nestjs/platform-express/multer'
import { CustomStorage } from "src/custome.storage";
import { AuthGuard } from "src/stratgey";
import { verifyAuth } from "src/common/utils/verifyAuth";

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

    @UseGuards(AuthGuard)
    @Put('update-profile')
    @UseInterceptors(FileInterceptor('file',{storage:CustomStorage.storage}))
    updateProfile(@Body() dto:UpdateProfle,@UploadedFile() file: Express.Multer.File,@Request() req)
    {
        return this.userService.updateProfile(dto,file,req)
    }

    @UseGuards(AuthGuard)
    @Post('subscribe')
    createUserSubscribe(@Request() req,@Body() dto:UserSubscribe)
    {
        verifyAuth(req.user.role,"user")
        return this.userService.createUserSubscribe(dto,req)
    }

    @UseGuards(AuthGuard)
    @Post('rate-book')
    rateBook(@Request() req,@Body() dto:Rating)
    {
        verifyAuth(req.user.role,"user")
        return this.userService.rateBook(dto,req)
    }

    @UseGuards(AuthGuard)
    @Post('add-quote')
    addQuote(@Request() req,@Body() dto:AddQuote)
    {
        verifyAuth(req.user.role,"user")
        return this.userService.AddQuote(dto,req)
    }

    @UseGuards(AuthGuard)
    @Post('quote-comment')
    addCommentQuote(@Request() req,@Body() dto:AddQuoteComment)
    {
        verifyAuth(req.user.role,"user")
        return this.userService.AddQuoteComment(dto,req)
    }

    @UseGuards(AuthGuard)
    @Post('quote-like')
    addLike(@Request() req,@Body() dto:AddLikeQuote)
    {
        verifyAuth(req.user.role,"user")
        return this.userService.addLike(dto,req)
    }
}