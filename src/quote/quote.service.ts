import {Inject, Injectable} from '@nestjs/common'
import { Quote } from './quote.entity';

@Injectable({})
export class QuoteService {
    constructor(
        @Inject('QUOTE_REPOSITORY')
        private quoteRepository : Quote
    ){}
}