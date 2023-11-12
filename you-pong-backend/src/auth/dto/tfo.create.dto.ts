import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class TfohDto{
    @ApiProperty({
        description:"the new usernmae",
        example:"Almo9atilo anabilo"
    })
    @IsNotEmpty()
    newUsername: string;
    
    @ApiProperty({
        description:"the status of Tfa service",
        example:"false"
    })
    @IsBoolean()
    tfoStatus: boolean;
}

