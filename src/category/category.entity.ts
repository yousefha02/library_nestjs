import { Column, Table,Model } from "sequelize-typescript";

@Table
export class Category extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number
}