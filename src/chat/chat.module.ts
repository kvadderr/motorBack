import { Module, forwardRef } from '@nestjs/common';

import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/messages.entity';
import { Chat } from './entities/chats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      Message,
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ChatService]
})
export class ChatModule {}