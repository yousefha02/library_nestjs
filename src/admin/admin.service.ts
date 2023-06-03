import {Inject, Injectable} from '@nestjs/common'
import { Admin } from './admin.entity'

@Injectable({})
export class AdminService {
    constructor(
        @Inject('ADMIN_REPOSITORY')
        private adminRepository : Admin
    ){}
    signup()
    {
        return "signup"
    }

    login()
    {
        return "login"
    }
}