import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Message } from './entities/messages.entity';
import { Chat } from './entities/chats.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findChatOrCreate(userId: number, friendId: number) {
        const chat = await this.chatRepository.findOne({
            where: [
                { user1_id: userId, user2_id: friendId },
                { user1_id: friendId, user2_id: userId }
            ]
        });

        if (!chat) {
            const newChat = new Chat();
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const friend = await this.userRepository.findOne({ where: { id: friendId } });

            newChat.user1 = user;
            newChat.user2 = friend;

            await this.chatRepository.save(newChat);

            return newChat;
        }

        return chat; 
    }

    async storeMessage(content: string, chatId: number, userId: number){
       /* 
        const chat = await this.chatRepository.findOne({ where: { id: chatId } });
        const user = await User.findOne(userId);

        const message = new Message();
        message.content = content;
        message.chat = chat;
        message.sender = user;

        await message.save();

        return message;
    }

    async findChats(userId: number): Promise<Chat[]> {
        const chats = await this.chatRepository.find({
            where: [
                { user1: userId },
                { user2: userId }
            ],
            relations: ['user1', 'user2']
        });

        return chats; */
    }

    async findMessages(chatId: number){
      /*  const messages = await this.messageRepository.find({
            where: { chat: chatId },
            order: { createdAt: 'ASC' },
            relations: ['sender']
        });

        return messages;
        */
    }
}