import { Controller } from "@nestjs/common";
import { BookService } from "./book.service";

@Controller("category")
export class BookController{
    constructor(private bookService:BookService){}
}