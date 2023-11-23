import { IsNotEmpty, IsString } from "class-validator";

export class achCreateDto{
    @IsNotEmpty()
    @IsString()
    title: string
    @IsString()
    @IsNotEmpty()
    description: string
    @IsString()
    @IsNotEmpty()
    requirement: string
    @IsString()
    @IsNotEmpty()
    avatar: string
}