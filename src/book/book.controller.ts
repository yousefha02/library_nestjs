import { Controller, Post,Body,UseInterceptors,UseGuards ,Request,UploadedFile, Put, Delete,Param} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBook, CreateBookLanguage, UpdateBook, UpdateBookTranslation } from "./dto";
import { CustomStorage } from "src/custome.storage";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/stratgey";
import { verifyAuth } from "src/common/utils/verifyAuth";

@Controller("book")
export class BookController{
    constructor(private bookService:BookService){} 

    @UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('file',{storage:CustomStorage.storage}))
    addBook(@Body() dto:CreateBook,@Request() req,@UploadedFile() file: Express.Multer.File)
    {
        verifyAuth(req.user.role,"admin")
        return this.bookService.addBook(dto,file)
    }

    @UseGuards(AuthGuard)
    @Post('create-language')
    addBookLanguage(@Body() dto:CreateBookLanguage,@Request() req)
    {
        verifyAuth(req.user.role,"admin")
        return this.bookService.addBookLanguage(dto)
    }

    @UseGuards(AuthGuard)
    @Put('update')
    @UseInterceptors(FileInterceptor('file',{storage:CustomStorage.storage}))
    updateBook(@Body() dto:UpdateBook,@Request() req,@UploadedFile() file: Express.Multer.File)
    {
        verifyAuth(req.user.role,"admin")
        return this.bookService.updateBook(dto,file)
    }

    @UseGuards(AuthGuard)
    @Put('update-language')
    updateBookLanguage(@Body() dto:UpdateBookTranslation,@Request() req)
    {
        verifyAuth(req.user.role,"admin")
        return this.bookService.updateBookLanguage(dto)
    }

    @UseGuards(AuthGuard)
    @Delete('langauge/:id')
    deleteLanguageBook(@Request() req,@Param('id') id: string)
    {
        verifyAuth(req.user.role,"admin")
        return this.bookService.deleteLanaguageBook(id)
    }
}