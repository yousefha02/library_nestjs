import { Column, Table,Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { ForumPost } from "./forumPost.entity";

@Table
export class PostLike extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @ForeignKey(()=>User)
    @Column
    userId:number

    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>ForumPost)
    @Column
    postId:number

    @BelongsTo(()=>ForumPost)
    forumPost:ForumPost
}