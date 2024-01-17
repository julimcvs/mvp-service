import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BaseEntity} from "typeorm"
import {User} from "./User";
import {PurchaseDetail} from "./PurchaseDetail";

@Entity()
export class Purchase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    purchaseDate: Date

    @Column()
    totalAmount: number

    @ManyToOne(() => User,
        () => Purchase,
        {lazy: true})
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: User;

    @OneToMany(() => PurchaseDetail,
        purchaseDetails => purchaseDetails.purchase,
        {lazy: true, cascade: ["insert"]})
    purchaseDetails: PurchaseDetail[];
}
