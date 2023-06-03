import { Column, Table,Model } from "sequelize-typescript";

@Table
export class Forum extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    title:string
}