import { Module, forwardRef } from '@nestjs/common';
import { FranchisorService } from './franchisor.service';
import { FranchisorController } from './franchisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchisor } from './entities/franchisor.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Franchisor])
  ],
  controllers: [FranchisorController],
  providers: [FranchisorService],
  exports: [FranchisorService]
})
export class FranchisorModule {}
