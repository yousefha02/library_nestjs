import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.entity";

@Table
export class Subscribe extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    startDate:Date

    @Column
    endDate:Date

    @Column({defaultValue:false})
    isActive:boolean

    @ForeignKey(()=>User)
    @Column
    userId:number

    @BelongsTo(()=>User)
    user:User
}