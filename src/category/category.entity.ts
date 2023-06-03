import { Column, Table,Model, HasMany } from "sequelize-typescript";
import { CategoryTranslation } from "./categoryTranslation.entity";

@Table
export class Category extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @HasMany(()=>CategoryTranslation)
    categoryTranslations:CategoryTranslation[]
}