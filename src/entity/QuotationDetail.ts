import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Product} from "./Product";
import {Quotation} from "./Quotation";

@Entity()
export class QuotationDetail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    subtotal: number

    @Column()
    productId: number

    @ManyToOne(() => Product,
        product => product.quotationDetails,
        {lazy: true})
    @JoinColumn({name: 'productId', referencedColumnName: 'id'})
    product: Product;

    @ManyToOne(() => Quotation,
        quotation => quotation.quotationDetails,
        {lazy: true, cascade: ["insert"], orphanedRowAction: "delete"})
    @JoinColumn({name: 'quotationId', referencedColumnName: 'id'})
    quotation: Quotation;
}
