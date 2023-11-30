import { IsNotEmpty, IsString } from "class-validator";

export class unlockAchDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}