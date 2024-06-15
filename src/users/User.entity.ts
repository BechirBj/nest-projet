import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/auth/roles.enum"; // Adjust import path as per your project structure

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
    roles: string[];

}
