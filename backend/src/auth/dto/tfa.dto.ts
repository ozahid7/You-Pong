import { IsNotEmpty } from "class-validator";

export class tfaDto{
    @IsNotEmpty()
    code: string;
}