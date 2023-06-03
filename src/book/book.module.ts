import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
    imports:[DatabaseModule],
    controllers:[BookController],
    providers:[
        BookService,
        {
            provide:'BOOK_REPOSITORY',
            useValue:Book
        }
    ],
    exports:['BOOK_REPOSITORY']
})


export class BookModule {
}