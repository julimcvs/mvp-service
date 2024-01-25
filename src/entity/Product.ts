import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import {QuotationDetail} from "./QuotationDetail";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    type: string

    @Column("bytea")
    image: string


    @OneToMany(() => QuotationDetail,
        quotationDetail => quotationDetail.product,
        {lazy: true})
    quotationDetails: QuotationDetail[];
}
