import { IsNotEmpty } from "class-validator";

export class friendDto{
    @IsNotEmpty()
    friend: string;
}