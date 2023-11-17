import { IsEmail, IsNotEmpty } from "class-validator";

export class localDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
}
