import { Column, Table,Model, HasMany } from "sequelize-typescript";
import { BookTranslation } from "./bookTranslation.entity";

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
}