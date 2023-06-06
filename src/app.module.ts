import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';
import { QuoteModule } from './quote/quote.module';
import {JwtModule} from '@nestjs/jwt'
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomStorage } from './custome.storage';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    AdminModule,CategoryModule,BookModule,UserModule,ForumModule,QuoteModule,
    JwtModule.register({global:true,secret:'token'}),],
})
export class AppModule {}
