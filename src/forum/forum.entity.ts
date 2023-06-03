import { Column, Table,Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { UserForum } from "./userForum.entity";
import { ForumPost } from "./forumPost.entity";

@Table
export class Forum extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    title:string

    @BelongsToMany(()=>User,()=>UserForum)
    users:User[]

    @HasMany(()=>ForumPost)
    posts:ForumPost[]
}