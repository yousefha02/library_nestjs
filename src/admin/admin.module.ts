import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Module({
    imports:[DatabaseModule],
    controllers:[AdminController],
    providers:[
        AdminService,
        {
            provide:'ADMIN_REPOSITORY',
            useValue:Admin
        }
    ],
    exports:['ADMIN_REPOSITORY']
})


export class AdminModule {
}