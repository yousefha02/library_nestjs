import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common'
import { User } from './user.entity';
import { AddLikeQuote, AddQuote, AddQuoteComment, EmailRegister, Rating, SignPassword, UpdateProfle, UserSubscribe, VerfiyCode } from './dto';
import { generateCode } from 'src/common/utils/generateCode';
import { sendEmail } from 'src/common/utils/sendEmail';
import * as bcryptjs from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'
import { Subscribe } from './subscribe.entity';
import { verifyUser } from 'src/common/utils/verifyUser';
import * as schedule from 'node-schedule'
import { Book } from 'src/book/book.entity';
import { Rate } from './rate.entity';
import { Quote } from 'src/quote/quote.entity';
import { QuoteComment } from 'src/quote/quoteComment.entity';
import { QuoteLike } from 'src/quote/quoteLike.entity';

@Injectable({})
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository : typeof User,
        private jwtService: JwtService,

        @Inject('SUBSCRIBE_REPOSITORY')
        private subscribeRepository : typeof Subscribe,

        @Inject('BOOK_REPOSITORY')
        private bookRepository : typeof Book,

        @Inject('RATE_REPOSITORY')
        private rateRepository : typeof Rate,

        @Inject('QUOTE_REPOSITORY')
        private quoteRepository : typeof Quote,

        @Inject('QUOTECOMMENT_REPOSITORY')
        private quoteCommentRepository : typeof QuoteComment,

        @Inject('QUOTELIKE_REPOSITORY')
        private quoteLikeRepository : typeof QuoteLike
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

    async updateProfile(dto:UpdateProfle,file:Express.Multer.File,req)
    {
        const {name,userId} = dto
        if(req.user.userId.toString()!==userId.toString())
        {
            throw new ForbiddenException("can not do action")
        }
        const user = await this.userRepository.findOne({where:{id:userId,isVerify:true}})
        if(!user)
        {
            throw new NotFoundException('user is not found')
        }
        await user.update({image:file.filename,name})
        return {message:"user has been updated",image:user.image,name:user.name}
    }

    async createUserSubscribe(dto:UserSubscribe,req)
    {
        const {userId} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const userSubscribe = await this.subscribeRepository.findOne({where:{userId,isActive:true}})
        if(userSubscribe)
        {
            throw new ForbiddenException('you have a subscribe')
        }
        const startDate = new Date()
        const endDate = new Date()
        new Date(endDate.setDate(endDate.getDate()+30))
        await this.subscribeRepository.create({userId,startDate,endDate,isActive:true})

        const foundSubscribe = await this.subscribeRepository.findOne({where:{userId,isActive:true}})
        schedule.scheduleJob(endDate,async function(){
            await foundSubscribe.update({isActive:false})
        });
        return {message:"user has been subscribed"}
    }

    async rateBook(dto:Rating,req)
    {
        const {userId,bookId,conent,rate} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const user = await this.userRepository.findByPk(userId)
        const book = await this.bookRepository.findByPk(bookId)
        if(!user||!book)
        {
            throw new NotFoundException('book or user is not found')
        }
        if(!this.verifyUserSubscribe(userId))
        {
            throw new ForbiddenException('you are not allowed to do this action')
        }
        const rateFound = await this.rateRepository.findOne({where:{userId,bookId}})
        if(rateFound)
        {
            throw new ForbiddenException('you rated the book before')
        }
        await this.rateRepository.create({userId,bookId,conent,rate})
        return {message:"you have rated the book , thx"}
    }

    async AddQuote(dto:AddQuote,req)
    {
        const {userId,bookId,comment} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const user = await this.userRepository.findByPk(userId)
        const book = await this.bookRepository.findByPk(bookId)
        if(!user||!book)
        {
            throw new NotFoundException('book or user is not found')
        }
        if(!this.verifyUserSubscribe(userId))
        {
            throw new ForbiddenException('you are not allowed to do this action')
        }
        const quote = await this.quoteRepository.create({userId,bookId,comment})
        return {quote}
    }

    async AddQuoteComment(dto:AddQuoteComment,req)
    {
        const {userId,quoteId,content} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const user = await this.userRepository.findByPk(userId)
        const quote = await this.quoteRepository.findByPk(quoteId)
        if(!user||!quote)
        {
            throw new NotFoundException('quote or user is not found')
        }
        if(!this.verifyUserSubscribe(userServerId))
        {
            throw new ForbiddenException('you are not allowed to do this action')
        }
        const quoteComment = await this.quoteCommentRepository.create({content,userId,quoteId})
        return {quoteComment}
    }

    async addLike(dto:AddLikeQuote,req)
    {
        const {userId,quoteId} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const user = await this.userRepository.findByPk(userId)
        const quote = await this.quoteRepository.findByPk(quoteId)
        if(!user||!quote)
        {
            throw new NotFoundException('quote or user is not found')
        }
        if(!this.verifyUserSubscribe(userServerId))
        {
            throw new ForbiddenException('you are not allowed to do this action')
        }
        const like = await this.quoteLikeRepository.findOne({where:{userId,quoteId}})
        if(like)
        {
            if(like.type==1)
            await like.update({type:0})
            else
            await like.update({type:1})
        }
        else{
            await this.quoteLikeRepository.create({userId,quoteId,type:1})
        }
        return {message:"you like or remove like it"}
    }

    async addDisLike(dto:AddLikeQuote,req)
    {
        const {userId,quoteId} = dto
        const userServerId = req.user.userId;
        verifyUser(userId,userServerId)
        const user = await this.userRepository.findByPk(userId)
        const quote = await this.quoteRepository.findByPk(quoteId)
        if(!user||!quote)
        {
            throw new NotFoundException('quote or user is not found')
        }
        if(!this.verifyUserSubscribe(userServerId))
        {
            throw new ForbiddenException('you are not allowed to do this action')
        }
        const like = await this.quoteLikeRepository.findOne({where:{userId,quoteId}})
        if(like)
        {
            if(like.type==-1)
            await like.update({type:0})
            else
            await like.update({type:-1})
        }
        else{
            await this.quoteLikeRepository.create({userId,quoteId,type:1})
        }
        return {message:"you dislike like or remove like it"}
    }

    async verifyUserSubscribe(userId:string)
    {
        const subscribe = await this.subscribeRepository.findOne({where:{userId,isActive:true}})
        return subscribe ;
    }
}