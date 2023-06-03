import { Column, Table,Model, HasMany, BelongsToMany } from "sequelize-typescript";
import { Subscribe } from "./subscribe.entity";
import { Rate } from "src/book/rate.entity";
import { Forum } from "src/forum/forum.entity";
import { UserForum } from "src/forum/userForum.entity";
import { ForumPost } from "src/forum/forumPost.entity";

@Table
export class User extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    email:string

    @Column
    password:string

    @Column
    image:string

    @Column
    name:string

    @Column
    verficationCode:string
    
    @Column({defaultValue:false})
    isVerify:boolean

    @HasMany(()=>Subscribe)
    subscribs: Subscribe[]

    @HasMany(()=>Rate)
    rates: Rate[]

    @BelongsToMany(()=>Forum,()=>UserForum)
    forums:Forum[]

    @HasMany(()=>ForumPost)
    posts:ForumPost[]
}