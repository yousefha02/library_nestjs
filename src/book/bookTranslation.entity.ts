import { Column, Table,Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Book } from "./book.entity";

@Table
export class BookTranslation extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    lang:string

    @Column
    authorName:string

    @Column({type:DataType.TEXT})
    description:string

    @ForeignKey(()=>Book)
    @Column
    bookId:number

    @BelongsTo(()=>Book)
    book:Book
}