import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [AdminModule,CategoryModule,BookModule,UserModule,ForumModule,QuoteModule],
})
export class AppModule {}
