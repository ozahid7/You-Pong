import { Module } from "@nestjs/common";
import { TfaController } from "./tfa.controller";
import { TfaAuthService } from "src/auth/services";

@Module({
    imports: [TfaAuthService],
    controllers: [TfaController],
    providers: [TfaAuthService],
})
export class TfaModule {}