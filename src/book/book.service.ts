import {Inject, Injectable,NotFoundException} from '@nestjs/common'
import { Book } from './book.entity'
import { CreateBook, CreateBookLanguage } from './dto'
import { Category } from 'src/category/category.entity'
import { BookTranslation } from './bookTranslation.entity'

@Injectable({})
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository : typeof Book,

        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository : typeof Category,

        @Inject('BOOKLANG_REPOSITORY')
        private bookLangRepository : typeof BookTranslation
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

    async addBookLanguage(dto:CreateBookLanguage)
    {
        const book = await this.bookRepository.findByPk(dto.bookId)
        if(!book)
        {
            throw new NotFoundException('book is not found')
        }
        await this.bookLangRepository.create({...dto})
        return {message:"language has been added"}
    }
}