import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/role.guard';

import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { FranchisorModule } from './franchisor/franchisor.module';


import { DialogsModule } from './dialogs/dialogs.module';
import { MessagesModule } from './messages/messages.module';
import { MailModule } from './mail/mail.module';
import { SpaceworkModule } from './spacework/spacework.module';
import { FranchiseeModule } from './franchisee/franchisee.module';

import { User } from './user/user.entity';
import { Franchisor } from './franchisor/entities/franchisor.entity';
import { Spacework } from './spacework/entities/spacework.entity';
import { Franchisee } from './franchisee/entities/franchisee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Zsxdcf123',
      username: 'postgres',
      entities: [
        User,
        Franchisor,
        Spacework,
        Franchisee
      ],
      database: 'motor',
      synchronize: true,
      logging: false,
    }),
    UserModule,
    FranchisorModule,
    DialogsModule,
    MessagesModule,
    MailModule,
    SpaceworkModule,
    FranchiseeModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
