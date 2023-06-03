import { Column, Table,Model } from "sequelize-typescript";

@Table
export class User extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    email:string

    @Column
    password:string

    @Column
    image:string

    @Column
    name:string

    @Column
    verficationCode:string
    
    @Column({defaultValue:false})
    isVerify:boolean
}