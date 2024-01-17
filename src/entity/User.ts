import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity} from "typeorm"
import {Address} from "./Address";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    cpf: string

    @Column()
    name: string

    @Column()
    age: number

    @ManyToOne(() => Address,
        () => User,
        {lazy: true, cascade: ["insert", "update"]})
    @JoinColumn({name: 'addressId', referencedColumnName: 'id'})
    address: Address;

}
