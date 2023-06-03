import { Column, Table,Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { Forum } from "./forum.entity";

@Table
export class ForumPost extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    title:string

    @ForeignKey(()=>User)
    @Column
    userId:number

    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>Forum)
    @Column
    forumId:number

    @BelongsTo(()=>Forum)
    forum:Forum
}