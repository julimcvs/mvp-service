import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string

    @Column()
    neighborhood: string

    @Column()
    number: string

    @Column()
    zipCode: string

    @Column()
    state: string
}
