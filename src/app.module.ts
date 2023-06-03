import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule,CategoryModule,BookModule,UserModule],
})
export class AppModule {}
