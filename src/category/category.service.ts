import {Inject, Injectable} from '@nestjs/common'
import { Category } from './category.entity'

@Injectable({})
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository : typeof Category
    ){}
    async createCategory()
    {
        const category = await this.categoryRepository.create()
        return {category,message:"category has been updated"}
    }
}