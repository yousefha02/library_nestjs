import {Inject, Injectable,NotFoundException} from '@nestjs/common'
import { Book } from './book.entity'
import { CreateBook, CreateBookLanguage, UpdateBook, UpdateBookTranslation } from './dto'
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

    async updateBook(dto:UpdateBook,file)
    {
        const category = await this.categoryRepository.findByPk(dto.categoryId)
        if(!category)
        {
            throw new NotFoundException('category is not found')
        }
        const book = await this.bookRepository.findByPk(dto.bookId)
        if(!book)
        {
            throw new NotFoundException('book is not found')
        }
        if(file)
        {
            await book.update({file:file.filename})
        }
        await book.update({...dto})
        return {message:"book has been updated"}
    }

    async updateBookLanguage(dto:UpdateBookTranslation)
    {
        const book = await this.bookLangRepository.findByPk(dto.bookTranslationId)
        if(!book)
        {
            throw new NotFoundException('book is not found')
        }
        await book.update({description:dto.description,authorName:dto.authorName})
        return {message:"book has been updated"}
    }

    async deleteLanaguageBook(id:string)
    {
        const book = await this.bookLangRepository.findByPk(id)
        if(!book)
        {
            throw new NotFoundException('book is not found')
        }
        await book.destroy()
        return {message:"book language has deleted"}
    }

    async deleteBook(id:string)
    {
        const book = await this.bookRepository.findByPk(id)
        if(!book)
        {
            throw new NotFoundException('book is not found')
        }
        await book.destroy()
        return {message:"book has deleted"}
    }
}