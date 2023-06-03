import {Inject, Injectable} from '@nestjs/common'
import { Forum } from './forum.entity';

@Injectable({})
export class ForumService {
    constructor(
        @Inject('FORUM_REPOSITORY')
        private forumRepository : Forum
    ){}
}