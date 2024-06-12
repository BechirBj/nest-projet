import { Role } from "src/auth/roles.enum";
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
    
    @Column()
    password: string;
    
    @Column('simple-array')
    roles: Role[];

}