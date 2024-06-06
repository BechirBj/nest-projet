import { Controller,Delete,Get,Patch,Post ,Param, Body, HttpCode, HttpStatus,  ParseUUIDPipe} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { UserEntity } from "./User.entity";
import { ServiceUser } from "./users.Service";

@Controller("users")
export class UsersController{

    constructor(private readonly userService: ServiceUser){}
 
    @Get()
    find(): UserEntity[] {
        return this.userService.findUsers();
    }
 
    @Get(":id") // returs the user that was passed in the GET request (localhost:3000/users/id)
    /* Pipes like " try catch "    that handles 
    transformation and validation of data before it reaches your route handlers. */ 
 
    findOne(@Param("id",new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.FORBIDDEN })) 
    id: string): UserEntity {
        // Mapping 3al users 7ata len yal9a l id == user.id
        return  this.userService.findById(id);
    }


    //ValidationPipe forces Nest to check the validity of the parameters based on the main class
    @Post() 
    create(@Body() createUserDto : CreateUserDto ) {
        return this.userService.CreateUser(createUserDto)
    }



    @Patch(":id")       
    update(
    @Param("id",ParseUUIDPipe) id: string,
    @Body() updateUserDto : UpdateUserDto 
    ){
        return this.userService.UpdateUser(id,updateUserDto);
    }

    @Delete(":id")   
    @HttpCode(HttpStatus.NO_CONTENT)  // You can change the status code here  to indicate the result of a request
    remove(@Param("id",ParseUUIDPipe ) id: string)  {
        
        return this.userService.DeleteUser(id)

    }   
    
}