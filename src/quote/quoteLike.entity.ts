import { DataTypes } from "sequelize";
import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { Quote } from "./quote.entity";

@Table
export class QuoteLike extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({type:DataTypes.TEXT,defaultValue:0})
    type:number

    @ForeignKey(()=>User)
    @Column
    userId:number

    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>Quote)
    @Column
    quoteId:number

    @BelongsTo(()=>Quote)
    quote:Quote
}