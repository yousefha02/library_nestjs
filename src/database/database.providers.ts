import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 6400,
            username: 'root',
            password: '2838293yo',
            database: 'library_db',
        });
        sequelize.addModels([]);
        await sequelize.sync();
        return sequelize;
        },
    },
];