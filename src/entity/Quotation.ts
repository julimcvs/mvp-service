import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm"
import {QuotationDetail} from "./QuotationDetail";

@Entity()
export class Quotation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string

    @Column()
    totalAmount: number

    @OneToMany(() => QuotationDetail,
        quotationDetails => quotationDetails.quotation,
        {lazy: true, cascade: ["insert", "update"]})
    quotationDetails: QuotationDetail[];
}
