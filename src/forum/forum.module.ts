import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ForumController } from './forum.controller';
import { Forum } from './forum.entity';
import { ForumService } from './forum.service';

@Module({
    imports:[DatabaseModule],
    controllers:[ForumController],
    providers:[
        ForumService,
        {
            provide:'FORUM_REPOSITORY',
            useValue:Forum
        }
    ],
    exports:['FORUM_REPOSITORY']
})


export class ForumModule {
}