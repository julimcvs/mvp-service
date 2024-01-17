import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BaseEntity} from "typeorm"
import {User} from "./User";
import {QuotationDetail} from "./QuotationDetail";

@Entity()
export class Quotation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string

    @Column()
    totalAmount: number

    @ManyToOne(() => User,
        () => Quotation,
        {lazy: true, nullable: true})
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user?: User;

    @OneToMany(() => QuotationDetail,
        quotationDetails => quotationDetails.quotation,
        {lazy: true, cascade: ["insert", "update"]})
    quotationDetails: QuotationDetail[];
}
