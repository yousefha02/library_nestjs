import { Controller, Post,Request,UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { verifyAuth } from "src/common/utils/verifyAuth";
import { AuthGuard } from "src/stratgey";

@Controller("category")
export class CategoryController{
    constructor(private categoryService:CategoryService){}
    @UseGuards(AuthGuard)
    @Post('create')
    createCategory(@Request() req)
    {
        verifyAuth(req.user.role,"admin")
        return this.categoryService.createCategory()
    }
}