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
        () => QuotationDetail,
        {lazy: true})
    @JoinColumn({name: 'productId', referencedColumnName: 'id'})
    product: Product;

    @ManyToOne(() => Quotation,
        () => QuotationDetail,
        {lazy: true, orphanedRowAction: "delete"})
    @JoinColumn({name: 'quotationId', referencedColumnName: 'id'})
    quotation: Quotation;
}
