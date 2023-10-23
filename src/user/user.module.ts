import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { FranchisorModule } from 'src/franchisor/franchisor.module';
import { FranchisorService } from 'src/franchisor/franchisor.service';
import { SpaceworkModule } from 'src/spacework/spacework.module';
import { FranchiseeModule } from 'src/franchisee/franchisee.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => FranchisorModule),
    forwardRef(() => SpaceworkModule),
    forwardRef(() => FranchiseeModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService]
})
export class UserModule {}
