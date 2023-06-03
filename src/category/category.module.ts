import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';

@Module({
    imports:[DatabaseModule],
    controllers:[CategoryController],
    providers:[
        CategoryService,
        {
            provide:'CATEGORY_REPOSITORY',
            useValue:Category
        }
    ],
    exports:['CATEGORY_REPOSITORY']
})


export class CategoryModule {
}