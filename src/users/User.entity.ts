import { InterMiami } from "src/Interfaces/interfaces/entities/interface.entity";
import { Role } from "src/auth/roles.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    roles: Role;

    @OneToMany(() => InterMiami, interMiami => interMiami.owner)
    interfaces: InterMiami[];
}
