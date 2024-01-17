import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import {Address} from "./Address";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cpf: string

    @Column()
    name: string

    @Column()
    age: number

    @ManyToOne(() => Address,
        () => User,
        {lazy: true})
    @JoinColumn({name: 'addressId', referencedColumnName: 'id'})
    address: Address;

}
