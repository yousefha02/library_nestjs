import {ForbiddenException, Inject, Injectable} from '@nestjs/common'
import { User } from './user.entity';
import { EmailRegister, SignPassword, VerfiyCode } from './dto';
import { generateCode } from 'src/common/utils/generateCode';
import { sendEmail } from 'src/common/utils/sendEmail';
import * as bcryptjs from 'bcryptjs'

@Injectable({})
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository : typeof User
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
}