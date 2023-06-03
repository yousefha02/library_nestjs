import { Sequelize } from 'sequelize-typescript';
import  {Admin} from 'src/admin/admin.entity';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';
import { CategoryTranslation } from 'src/category/categoryTranslation.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '2838293yo',
            database: 'library_db',
        });
        sequelize.addModels([Admin,Category,CategoryTranslation,Book]);
        await sequelize.sync();
        return sequelize;
        },
    },
];