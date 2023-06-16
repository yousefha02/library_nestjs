import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Subscribe } from './subscribe.entity';
import { BookModule } from 'src/book/book.module';
import { Rate } from './rate.entity';

@Module({
    imports:[DatabaseModule,BookModule],
    controllers:[UserController],
    providers:[
        UserService,
        {
            provide:'USER_REPOSITORY',
            useValue:User
        },
        {
            provide:'SUBSCRIBE_REPOSITORY',
            useValue:Subscribe
        },
        {
            provide:'RATE_REPOSITORY',
            useValue:Rate
        }
    ],
    exports:['USER_REPOSITORY']
})


export class UserModule {
}