import { Controller, Post,Request,UseGuards ,Body,Get,Query,Put,Delete,Param} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { verifyAuth } from "src/common/utils/verifyAuth";
import { AuthGuard } from "src/stratgey";
import { UpdateCategory, TranslationCategory } from "./dto";

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

    @UseGuards(AuthGuard)
    @Post('translation/create')
    createCategoryTranslation(@Body() dto:TranslationCategory,@Request() req)
    {
        verifyAuth(req.user.role,"admin")
        return this.categoryService.createCategoryTranslation(dto)
    }
    
    @Get('all')
    getCategories(@Query('lang') lang:string)
    {
        return this.categoryService.getCategories(lang)
    }

    @UseGuards(AuthGuard)
    @Put('update')
    updateCategory(@Request() req,@Body() dto:UpdateCategory)
    {
        verifyAuth(req.user.role,"admin")
        return this.categoryService.updateCategory(dto)
    }

    @UseGuards(AuthGuard)
    @Delete('/language/:id')
    deleteCategoryTranslation(@Request() req,@Param('id') id: string)
    {
        verifyAuth(req.user.role,"admin")
        return this.categoryService.deleteCategoryTranslation(id)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteCategory(@Request() req,@Param('id') id: string)
    {
        verifyAuth(req.user.role,"admin")
        return this.categoryService.deleteCategory(id)
    }
}