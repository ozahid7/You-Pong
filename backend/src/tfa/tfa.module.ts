import { Module } from "@nestjs/common";
import { TfaController } from "./tfa.controller";
import { TfaAuthService } from "src/auth/services";
import { TfaUserService } from "src/user/services";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [TfaController],
    providers: [TfaUserService],
})
export class TfaModule {}