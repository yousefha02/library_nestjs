import {Inject, Injectable,NotFoundException} from '@nestjs/common'
import { Category } from './category.entity'
import { TranslationCategory, UpdateCategory } from './dto'
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
            {
                attributes:['id'],
                include:[{model:this.categoryTranslationRepository,where:{lang},required:false,attributes:['title','id']}]
            }
            )
        return {cateogires}
    }

    async updateCategory(dto:UpdateCategory)
    {
        const {categoryTranslationId,title} = dto
        const categoryTranslation = await this.categoryTranslationRepository.findByPk(categoryTranslationId)
        if(!categoryTranslation)
        {
            throw new NotFoundException('category translation has not found')
        }
        await categoryTranslation.update({title:title})
        return {message:"category has been updated"}
    }

    async deleteCategoryTranslation(id:string)
    {
        const category = await this.categoryTranslationRepository.findByPk(id)
        if(!category)
        {
            throw new NotFoundException('category translation has not found')
        }
        await category.destroy()
        return {message:"category translation has been deleted"}
    }

    async deleteCategory(id:string)
    {
        const category = await this.categoryRepository.findByPk(id)
        if(!category)
        {
            throw new NotFoundException('category has not found')
        }
        await category.destroy()
        return {message:"category has been deleted"}
    }
}