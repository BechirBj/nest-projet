import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    country: string;
}