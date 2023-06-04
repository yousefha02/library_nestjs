import { DataTypes } from "sequelize";
import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { Quote } from "./quote.entity";

@Table
export class QuoteComment extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({type:DataTypes.TEXT})
    content:string

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