import { DataTypes } from "sequelize";
import { Column, Table,Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";
import { QuoteLike } from "./quoteLike.entity";

@Table
export class Quote extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({type:DataTypes.TEXT})
    comment:string

    @ForeignKey(()=>Book)
    @Column
    bookId:number

    @BelongsTo(()=>Book)
    book:Book

    @ForeignKey(()=>User)
    @Column
    userId:number

    @BelongsTo(()=>User)
    user:User

    @HasMany(()=>QuoteLike)
    likes:QuoteLike[]
}