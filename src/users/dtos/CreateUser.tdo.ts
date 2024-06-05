        // DTO Data transfer object  in an object that defines how the data will be sent over the network

export class CreateUserDto {
    readonly username: string;  
    readonly email: string;
    readonly country: string;
}