import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports:[DatabaseModule],
    controllers:[UserController],
    providers:[
        UserService,
        {
            provide:'USER_REPOSITORY',
            useValue:User
        }
    ],
    exports:['USER_REPOSITORY']
})


export class UserModule {
}