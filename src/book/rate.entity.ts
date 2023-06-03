import { DataTypes } from "sequelize";
import { Column, Table,Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Book } from "./book.entity";
import { User } from "src/user/user.entity";

@Table
export class Rate extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({type:DataTypes.TEXT})
    conent:string

    @Column
    rate:number

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
}