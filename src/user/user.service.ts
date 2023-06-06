import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common'
import { User } from './user.entity';
import { EmailRegister, SignPassword, UpdateProfle, VerfiyCode } from './dto';
import { generateCode } from 'src/common/utils/generateCode';
import { sendEmail } from 'src/common/utils/sendEmail';
import * as bcryptjs from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'

@Injectable({})
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository : typeof User,
        private jwtService: JwtService
    ){}

    async registerEmail(dto:EmailRegister)
    {
        const {email} = dto ;
        const existUser = await this.userRepository.findOne({where:{email:email,isVerify:true}})
        if(existUser)
        {
            throw new ForbiddenException('email is found')
        }
        const verficationCode = generateCode()
        const user = await this.userRepository.findOne({where:{email:email,isVerify:false}})
        if(user)
        {
            await user.update({verficationCode:verficationCode})
        }
        else{
            await this.userRepository.create({email:email,verficationCode:verficationCode})
        }
        const mailOptions = {
            from: 'yousefha2029@gmail.com',
            to: email,
            subject: 'Hello from library',
            text: `This is your verficationCode ${verficationCode}`
        };
        sendEmail(mailOptions)
        return {message:"email has created"}
    }

    async verifyCode(dto:VerfiyCode)
    {
        const {email,code} = dto
        const existUser = await this.userRepository.findOne({where:{email:email,isVerify:true}})
        if(existUser)
        {
            throw new ForbiddenException('email is verified')
        }
        const user = await this.userRepository.findOne({where:{email:email,isVerify:false,verficationCode:code}})
        if(!user)
        {
            throw new ForbiddenException('code is wrong')
        }
        return "code is right"
    }

    async signPassword(dto:SignPassword)
    {
        const {email,password} = dto
        const existUser = await this.userRepository.findOne({where:{email:email,isVerify:true}})
        if(existUser)
        {
            throw new ForbiddenException('email is verified')
        }
        const user = await this.userRepository.findOne({where:{email:email,isVerify:false}})
        if(!user)
        {
            throw new ForbiddenException('email is not exist')
        }
        const hashPassword = await bcryptjs.hash(password,12)
        await user.update({isVerify:true,password:hashPassword})
        return "account has been created"
    }

    async login(dto:SignPassword)
    {
        const {email} = dto
        const foundUser = await this.userRepository.findOne({where:{email:email}})
        if(!foundUser)
        {
            throw new NotFoundException("email is wrong")
        }
        const isMatch = await bcryptjs.compare(dto.password,foundUser.password)
        if(!isMatch)
        {
            throw new NotFoundException("password is wrong")
        }
        const token = await this.jwtService.signAsync({userId:foundUser.id,role:"user"})
        const {password , ...others} = foundUser.toJSON()  
        return {user:others,token}
    }

    async updateProfile(dto:UpdateProfle,file:Express.Multer.File)
    {
        return "update"
    }
}