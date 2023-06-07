import {Inject, Injectable,NotFoundException} from '@nestjs/common'
import { Category } from './category.entity'
import { TranslationCategory } from './dto'
import { CategoryTranslation } from './categoryTranslation.entity'

@Injectable({})
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository : typeof Category,

        @Inject('CATEGORYTRANSLATION_REPOSITORY')
        private categoryTranslationRepository : typeof CategoryTranslation
    ){}
    async createCategory()
    {
        const category = await this.categoryRepository.create()
        return {category,message:"category has been updated"}
    }
    
    async createCategoryTranslation(dto:TranslationCategory)
    {
        const {categoryId,title,lang} = dto
        const category = await this.categoryRepository.findByPk(categoryId)
        if(!category)
        {
            throw new NotFoundException('category has not found')
        }
        const translationCategory = await this.categoryTranslationRepository.create({lang,title,categoryId})
        return {message:"language has been added to category",translationCategory}
    }

    async getCategories(lang="en")
    {
        const cateogires = await this.categoryRepository.findAll(
            {include:[{model:this.categoryTranslationRepository,where:{lang}}]}
            )
        return {cateogires}
    }
}