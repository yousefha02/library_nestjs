import {Inject, Injectable} from '@nestjs/common'
import { User } from './user.entity';

@Injectable({})
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository : User
    ){}
}