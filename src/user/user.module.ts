import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Subscribe } from './subscribe.entity';
import { BookModule } from 'src/book/book.module';
import { Rate } from './rate.entity';
import { Quote } from 'src/quote/quote.entity';
import { QuoteComment } from 'src/quote/quoteComment.entity';

@Module({
    imports:[DatabaseModule,BookModule],
    controllers:[UserController],
    providers:[
        UserService,
        {
            provide:'USER_REPOSITORY',
            useValue:User
        },
        {
            provide:'SUBSCRIBE_REPOSITORY',
            useValue:Subscribe
        },
        {
            provide:'RATE_REPOSITORY',
            useValue:Rate
        },
        {
            provide:'QUOTE_REPOSITORY',
            useValue:Quote
        },
        {
            provide:'QUOTECOMMENT_REPOSITORY',
            useValue:QuoteComment
        }
    ],
    exports:['USER_REPOSITORY']
})


export class UserModule {
}