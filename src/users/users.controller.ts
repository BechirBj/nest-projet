import { Controller,Delete,Get,Patch,Post, Req ,Param, Body, HttpCode} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";

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
    create(@Body() createUserDto : CreateUserDto ) {
        return createUserDto;
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