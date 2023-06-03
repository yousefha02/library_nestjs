import { Column, Table,Model, ForeignKey } from "sequelize-typescript";
import { Forum } from "./forum.entity";
import { User } from "src/user/user.entity";

@Table
export class UserForum extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @ForeignKey(()=>Forum)
    @Column
    forumId:number

    @ForeignKey(()=>User)
    @Column
    userId:number

}