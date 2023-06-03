import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuoteController } from './quote.controller';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';

@Module({
    imports:[DatabaseModule],
    controllers:[QuoteController],
    providers:[
        QuoteService,
        {
            provide:'QUOTE_REPOSITORY',
            useValue:Quote
        }
    ],
    exports:['QUOTE_REPOSITORY']
})


export class QuoteModule {
}