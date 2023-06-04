import { Sequelize } from 'sequelize-typescript';
import  {Admin} from 'src/admin/admin.entity';
import { Book } from 'src/book/book.entity';
import { BookTranslation } from 'src/book/bookTranslation.entity';
import { Rate } from 'src/book/rate.entity';
import { Category } from 'src/category/category.entity';
import { CategoryTranslation } from 'src/category/categoryTranslation.entity';
import { Forum } from 'src/forum/forum.entity';
import { ForumPost } from 'src/forum/forumPost.entity';
import { PostLike } from 'src/forum/postLike.entity';
import { UserForum } from 'src/forum/userForum.entity';
import { Quote } from 'src/quote/quote.entity';
import { QuoteLike } from 'src/quote/quoteLike.entity';
import { Subscribe } from 'src/user/subscribe.entity';
import { User } from 'src/user/user.entity';

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
        sequelize.addModels([Admin,Category,CategoryTranslation,Book,BookTranslation,User,Subscribe,Rate,Forum,UserForum,ForumPost,PostLike,Quote,QuoteLike]);
        await sequelize.sync();
        return sequelize;
        },
    },
];