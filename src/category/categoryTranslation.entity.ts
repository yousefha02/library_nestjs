import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "./category.entity";

@Table
export class CategoryTranslation extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    title: string;

    @Column
    lang: string;

    @ForeignKey(()=>Category)
    @Column
    categoryId:number

    @BelongsTo(()=>Category)
    category:Category
}