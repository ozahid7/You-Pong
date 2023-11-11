import { IsEmail, IsNotEmpty } from "class-validator";

export class TfohDto{
    @IsNotEmpty()
    token: string;
}

