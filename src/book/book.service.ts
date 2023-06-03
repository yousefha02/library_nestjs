import {Inject, Injectable} from '@nestjs/common'
import { Book } from './book.entity'

@Injectable({})
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository : Book
    ){}
}