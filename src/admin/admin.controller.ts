import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminRegister } from "./dto";

@Controller("admin")
export class AdminController{
    constructor(private adminService:AdminService){}

    @Post('register')
    signup(@Body() dto:AdminRegister){
        return this.adminService.register(dto)
    }

    @Post('login')
    login(@Body() dto:AdminRegister){
        return this.adminService.login(dto) 
    }
}