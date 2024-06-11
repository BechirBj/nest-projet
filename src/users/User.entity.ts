import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_entity')
export class UserEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    country: string;

}