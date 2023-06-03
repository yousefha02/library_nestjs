import { Sequelize } from 'sequelize-typescript';
import  {Admin} from 'src/admin/admin.entity';

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
        sequelize.addModels([Admin]);
        await sequelize.sync();
        return sequelize;
        },
    },
];