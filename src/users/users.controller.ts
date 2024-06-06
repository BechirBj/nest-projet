import { Controller,Delete,Get,Patch,Post ,Param, Body, HttpCode, HttpStatus,  ParseUUIDPipe, ValidationPipe} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { UserEntity } from "./User.entity";
import {v4 as uuid} from "uuid"

@Controller("users")
export class UsersController{


    private  users: UserEntity[] = [];


 
    @Get()
    find(): UserEntity[] {
        return this.users;
    }
 
    @Get(":id") // returs the user that was passed in the GET request (localhost:3000/users/id)
    /* Pipes like " try catch "    that handles 
    transformation and validation of data before it reaches your route handlers. */ 
 
    findOne(@Param("id",new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.FORBIDDEN })) 
    id: string): UserEntity {
        // Mapping 3al users 7ata len yal9a l id == user.id
        return  this.users.find((user) => user.id === id);
    }


    //ValidationPipe forces Nest to check the validity of the parameters based on the main class
    @Post() 
    create(@Body() createUserDto : CreateUserDto ) {
        const newUser : UserEntity  = {
            ...createUserDto,
            id: uuid(),
         }
        this.users.push(newUser);

        return newUser;
    }



    @Patch(":id")       
    update(
    @Param("id",ParseUUIDPipe) id: string,
    @Body() updateUserDto : UpdateUserDto 
    ){
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
    }

    @Delete(":id")   
    @HttpCode(HttpStatus.NO_CONTENT)  // You can change the status code here  to indicate the result of a request
    remove(@Param("id",ParseUUIDPipe ) id: string)  {
        // 1) find the user that has the passed id 
        this.users = this.users.filter((user : UserEntity) => user.id != id  );
        // 2) remove the user

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