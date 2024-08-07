import { Controller,Delete,Get,Patch,Post ,Param, Body, HttpCode, HttpStatus,  ParseUUIDPipe, UseGuards} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.tdo";
import { UpdateUserDto } from "./dtos/UpdateUser.tdo";
import { UserEntity } from "./User.entity";
import { ServiceUser } from "./users.Service";
import { Roles } from "src/auth/guard/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/Decorators/getUser.decorator";


@Controller("users")
export class UsersController{

    constructor(private readonly userService: ServiceUser){}
 
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async find(): Promise<UserEntity[]> {
        return await this.userService.findUsers();
    }
    
    @Get(":id") // returs the user that was passed in the GET request (localhost:3000/users/id)
    /* Pipes like " try catch "    that handles 
    transformation and validation of data before it reaches your route handlers. */ 
    @UseGuards(JwtAuthGuard)
    findOne( @GetUser() userEmail: string,
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.FORBIDDEN })) id: string,
    ) {
        return  userEmail;
    }


    //ValidationPipe forces Nest to check the validity of the parameters based on the main class
    @Post('/addUser') 
    create(@Body() createUserDto : CreateUserDto ) {
        return this.userService.CreateUser(createUserDto)
    }

    @Post(':email')
    FindByEmail(
        @Param('email') email: string
    ) {
        return  this.userService.findByEmail(email);
    }


    @Patch(":id")       
    update(
    @Param("id",ParseUUIDPipe) id: string,
    @Body() updateUserDto : UpdateUserDto 
    ){
        return this.userService.UpdateUser(id,updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.FORBIDDEN })) id: string
    ) {
        return this.userService.deleteUser(id);
    }  
    
}