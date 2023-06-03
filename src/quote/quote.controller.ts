import { Controller } from "@nestjs/common";
import { QuoteService } from "./quote.service";

@Controller("quote")
export class QuoteController{
    constructor(private quoteService:QuoteService){}
}