import { Column, Table,Model } from "sequelize-typescript";

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
}