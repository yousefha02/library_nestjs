import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryTranslation } from './categoryTranslation.entity';

@Module({
    imports:[DatabaseModule],
    controllers:[CategoryController],
    providers:[
        CategoryService,
        {
            provide:'CATEGORY_REPOSITORY',
            useValue:Category
        },
        {
            provide:'CATEGORYTRANSLATION_REPOSITORY',
            useValue:CategoryTranslation
        }
    ],
    exports:['CATEGORY_REPOSITORY','CATEGORYTRANSLATION_REPOSITORY']
})


export class CategoryModule {
}