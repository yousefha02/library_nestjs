import { AdminRegister } from './dto/admin.dto';
import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common'
import { Admin } from './admin.entity'
import * as bcryptjs from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'

@Injectable({})
export class AdminService {
    constructor(
        @Inject('ADMIN_REPOSITORY')
        private adminRepository : typeof Admin,
        private jwtService: JwtService
    ){}
    async register(dto:AdminRegister)
    {
        const existAdmin = await this.adminRepository.findOne()
        if(existAdmin)
        {
            throw new ForbiddenException("there is one admin in system")
        }
        const hasPassword = await bcryptjs.hash(dto.password,12)
        const admin = await this.adminRepository.create({email:dto.email,password:hasPassword})
        return {messgae:"admin account has created",admin}
    }

    async login(dto:AdminRegister)
    {
        const {email} = dto
        const foundAdmin = await this.adminRepository.findOne({where:{email:email}})
        if(!foundAdmin)
        {
            throw new NotFoundException("email is wrong")
        }
        const isMatch = await bcryptjs.compare(dto.password,foundAdmin.password)
        if(!isMatch)
        {
            throw new NotFoundException("password is wrong")
        }
        const token = await this.jwtService.signAsync({userId:foundAdmin.id,role:"admin"})
        const {password , ...others} = foundAdmin.toJSON()  
        return {admin:others,token}
    }
}