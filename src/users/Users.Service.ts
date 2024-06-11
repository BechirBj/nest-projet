import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./User.entity";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import {v4 as uuid} from "uuid"
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ServiceUser{

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<UserEntity>{
        return  await this.userRepository.findOne({ where: { email } });
    }

     /* 
    @Post()
    // @Req() decorator  allows you to access all aspects of the incoming request.
    create( /* @Req() req:Request ): string {
        /* 
        console.log(req.body);  refers to the body of the HTTP request, which typically contains data sent by the client
        return "User created successfully";
    } */ 

        
    async CreateUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const newUser: UserEntity = {
            ...createUserDto,
            id: uuid(),
        };
        return await this.userRepository.save(newUser);
    }

    async deleteUser(id: string): Promise<void> {
        const result: DeleteResult = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async UpdateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = this.userRepository.merge(user, updateUserDto);
        return await this.userRepository.save(updatedUser);
    }
    
    /*    UpdateUser(id: string, updateUserDto:UpdateUserDto): UserEntity{
        // 1) find the user that has the passed id 
        const index = this.users.findIndex((user : UserEntity) => user.id === id); 
        // 2) update the user
        const Updateduser = this.users[index] = {
           ...this.users[index],
           ...updateUserDto,
           // Ovveride the user with the data that was passed on @body() parametre
        }
        return Updateduser ;
        // direct methode : 
        // return this.users[index] ; 
    }; */ 


     
}