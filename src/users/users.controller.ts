import { Controller,Delete,Get,Patch,Post, Req ,Param, Body, HttpCode} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { UserEntity } from "./User.entity";
import {v4 as uuid} from "uuid"

@Controller("users")
export class UsersController{


    private readonly users: UserEntity[] = [];



    @Get()
    find(): UserEntity[] {
        return this.users;
    }
 
    @Get(":id") // returs the user that was passed in the GET request (localhost:3000/users/id)
    findOne(@Param("id") id: string): UserEntity {
        // Mapping 3al users 7ata len yal9a l id == user.id
        return  this.users.find((user) => user.id == id);
    }





    @Post() 
    create(@Body() createUserDto : CreateUserDto ) {
        const newUser : UserEntity  = {
            ...createUserDto,
            id: uuid(),
         }
        this.users.push(newUser);

        return newUser;
    }



    @Patch(":username")       
    update(@Param("username") username: string, @Body() updateUserDto : UpdateUserDto ){
        
        return updateUserDto ;

    }

    @Delete(":username")   
    @HttpCode(204)  // You can change the status code here  to indicate the result of a request
    remove(@Param("username", ) username: string) {
    }
    
    
    /* 
    @Post()
    // @Req() decorator  allows you to access all aspects of the incoming request.
    create( /* @Req() req:Request ): string {
        /* 
        console.log(req.body);  refers to the body of the HTTP request, which typically contains data sent by the client
        

        return "User created successfully";
    } */ 


    
    

}