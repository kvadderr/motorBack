import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/role.guard';
import { join } from 'path';

import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { FranchisorModule } from './franchisor/franchisor.module';
import { MailModule } from './mail/mail.module';
import { SpaceworkModule } from './spacework/spacework.module';
import { FranchiseeModule } from './franchisee/franchisee.module';
import { FolderModule } from './folder/folder.module';
import { GoogleModule } from './google/google.module';
import { FilesModule } from './files/files.module';
import { GroupModule } from './group/group.module';
import { FolderAccessModule } from './folder-access/folder-access.module';
import { GatewayModule } from './gateway/gateway.module'

import { User } from './user/user.entity';
import { Franchisor } from './franchisor/entities/franchisor.entity';
import { Spacework } from './spacework/entities/spacework.entity';
import { Franchisee } from './franchisee/entities/franchisee.entity';
import { Folder } from './folder/entities/folder.entity';
import { File } from './files/entities/file.entity';
import { Group } from './group/entities/group.entity';
import { FolderAccess } from './folder-access/entities/folder-access.entity';

import { AppGateway } from './app.gateway'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/public',
    }),
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
        Franchisee,
        Folder,
        File,
        Group,
        FolderAccess
      ],
      database: 'motor',
      synchronize: true,
      logging: false,
    }),
    UserModule,
    FranchisorModule,
    MailModule,
    SpaceworkModule,
    FranchiseeModule,
    FolderModule,
    GoogleModule,
    FilesModule,
    GroupModule,
    FolderAccessModule,
    GatewayModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, AppGateway
],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
