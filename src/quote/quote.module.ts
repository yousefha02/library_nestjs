import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuoteController } from './quote.controller';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';
import { QuoteComment } from './quoteComment.entity';

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
        }
    ],
    exports:['QUOTE_REPOSITORY','QUOTECOMMENT_REPOSITORY']
})


export class QuoteModule {
}