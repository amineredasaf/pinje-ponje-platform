import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { JwtAuthService } from '../auth/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { StatusGateway } from './status.gateway';

@Module({
  imports: [PrismaModule, ProfilesModule],
  providers: [UserService, JwtService, JwtAuthService, UserService, StatusGateway],
  controllers: [UserController],
  exports: [UserService, StatusGateway]
})
export class UserModule {}
