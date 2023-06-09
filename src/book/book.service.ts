import {Inject, Injectable,NotFoundException} from '@nestjs/common'
import { Book } from './book.entity'
import { CreateBook } from './dto'
import { Category } from 'src/category/category.entity'

@Injectable({})
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository : typeof Book,

        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository : typeof Category
    ){}
    async addBook(dto:CreateBook,file)
    {
        const category = await this.categoryRepository.findByPk(dto.categoryId)
        if(!category)
        {
            throw new NotFoundException('category is not found')
        }
        const book = await this.bookRepository.create({...dto,file:file.filename})
        return {message:"book has been created"}
    }
}