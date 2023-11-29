import { IsNotEmpty } from "class-validator";

export class sendReq{
    @IsNotEmpty()
    user: string;
}
