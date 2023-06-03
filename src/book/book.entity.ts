import { Column, Table,Model, HasMany, ForeignKey } from "sequelize-typescript";
import { BookTranslation } from "./bookTranslation.entity";
import { Category } from "src/category/category.entity";

@Table
export class Book extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    title:string

    @Column
    file:string

    @Column
    publishYear:Date

    @Column
    pages:number

    @HasMany(()=>BookTranslation)
    bookTranslations:BookTranslation[]

    @ForeignKey(()=>Category)
    @Column
    categoryId:number
}