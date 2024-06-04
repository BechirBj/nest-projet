import { Controller,Delete,Get,Patch,Post } from "@nestjs/common";

@Controller("users")
export class UsersController{
    
    @Get()
    find(): string []{
        return ['user1','user2','user3','user4'];
    }
 
    @Get()
    findOne(): string {
        return 'find 1 user';
    }

    @Post()
    create(): string {
        return "User created successfully";
    }

    @Patch()       
    update(): string {
        return "User updated successfully";
    }

    @Delete()       
    remove(): string {
        return "User removed successfully";
    }
    

}