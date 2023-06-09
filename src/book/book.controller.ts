import { Controller, Post,Body,UseInterceptors,UseGuards ,Request,UploadedFile} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBook, CreateBookLanguage } from "./dto";
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
}