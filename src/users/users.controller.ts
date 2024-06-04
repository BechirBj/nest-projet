import { Controller,Delete,Get,Patch,Post, Req ,Param, Body} from "@nestjs/common";
import { Request } from "express";

@Controller("users")
export class UsersController{
    
    @Get()
    find(): string []{
        return ['user1','user2','user3','user4'];
    }
 
    @Get(":username") // returs the username that was passed in the GET request (localhost:3000/users/username)
    findOne(@Param("username") username: string): string {
        return username;
    }

    @Post() // returs the data that was passed in the GET request (localhost:3000/users)
    create(@Body() userData : any ): string {

        return userData;
    }

    @Patch(":username")       
    update(@Param("username") username: string): string {
        return username +"removed successfully";

    }

    @Delete(":username")       
    remove(@Param("username") username: string): string {

        return username +" removed successfully";
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