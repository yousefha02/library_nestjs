import {Inject, Injectable} from '@nestjs/common'
import { Category } from './category.entity'

@Injectable({})
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository : Category
    ){}
}