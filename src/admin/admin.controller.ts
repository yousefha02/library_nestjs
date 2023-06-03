import { Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController{
    constructor(private adminService:AdminService){}

    @Post('register')
    signup(){
        return this.adminService.signup()
    }

    login(){
        return this.adminService.login()
    }
}