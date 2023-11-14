import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto{
    @ApiProperty({
        description:"the email adrress of user",
        example:"user@email.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description:"the password of a user",
        example:"super secret password"
    })
    @IsNotEmpty()
    password: string;
}
