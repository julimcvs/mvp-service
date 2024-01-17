import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Product} from "./Product";
import {Purchase} from "./Purchase";

@Entity()
export class PurchaseDetail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    subtotal: number

    @Column()
    productId: number

    @ManyToOne(() => Product,
        () => PurchaseDetail,
        {lazy: true})
    @JoinColumn({name: 'productId', referencedColumnName: 'id'})
    product: Product;

    @ManyToOne(() => Purchase,
        () => PurchaseDetail,
        {lazy: true})
    @JoinColumn({name: 'purchaseId', referencedColumnName: 'id'})
    purchase: Purchase;
}
