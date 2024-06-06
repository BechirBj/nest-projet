import { Injectable } from "@nestjs/common";
import { UserEntity } from "./User.entity";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import {v4 as uuid} from "uuid"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ServiceUser{

    private  users: UserEntity[] = [];
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){

    }


    findUsers(): UserEntity[] {
        return this.users;
    }

    findById(id: string): UserEntity{

        // Mapping 3al users 7ata len yal9a l id == user.id
        return  this.users.find((user) => user.id === id);
    }

     /* 
    @Post()
    // @Req() decorator  allows you to access all aspects of the incoming request.
    create( /* @Req() req:Request ): string {
        /* 
        console.log(req.body);  refers to the body of the HTTP request, which typically contains data sent by the client
        

        return "User created successfully";
    } */ 

        
    async CreateUser(createUserDto:CreateUserDto ): Promise<UserEntity>{
        const newUser : UserEntity  = {
            ...createUserDto,
            id: uuid(),
         }
         return await this.userRepository.save(newUser);
    }

    UpdateUser(id: string, updateUserDto:UpdateUserDto): UserEntity{
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
    };

    DeleteUser(id: string){
        // 1) find the user that has the passed id 
        this.users = this.users.filter((user : UserEntity) => user.id != id  );
        // 2) remove the user
    }
}