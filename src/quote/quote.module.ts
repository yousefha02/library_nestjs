import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuoteController } from './quote.controller';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';
import { QuoteComment } from './quoteComment.entity';
import { QuoteLike } from './quoteLike.entity';

@Module({
    imports:[DatabaseModule],
    controllers:[QuoteController],
    providers:[
        QuoteService,
        {
            provide:'QUOTE_REPOSITORY',
            useValue:Quote,
        },
        {
            provide:'QUOTECOMMENT_REPOSITORY',
            useValue:QuoteComment
        },
        {
            provide:'QUOTELIKE_REPOSITORY',
            useValue:QuoteLike
        }
    ],
    exports:['QUOTE_REPOSITORY','QUOTECOMMENT_REPOSITORY','QUOTELIKE_REPOSITORY']
})


export class QuoteModule {
}